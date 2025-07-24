import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import fs from 'node:fs/promises';
import path from 'node:path';

import {
  FIFTEEN_MINUTES,
  TEMPLATES_DIR,
  THIRTY_DAYS,
} from '../constants/index.js';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

import { env } from '../utils/env.js';
import { sendEmail } from '../utils/sendMail.js';

import handlebars from 'handlebars';

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = payload.password
    ? await bcrypt.hash(payload.password, 10)
    : null;

  const newUser = await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });

  await SessionsCollection.deleteOne({ userId: newUser._id });

  const accessToken = randomBytes(30).toString('base64url'); // URL-safe base64
  const refreshToken = randomBytes(30).toString('base64url'); // URL-safe base64

  const session = await SessionsCollection.create({
    userId: newUser._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });

  return { user: newUser, session };
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (user.password) {
    const isEqual = await bcrypt.compare(payload.password, user.password);
    if (!isEqual) {
      throw createHttpError(401, 'Unauthorized');
    }
  } else if (payload.password) {
    throw createHttpError(401, 'Please use Google Sign In for this account');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64url'); // URL-safe base64
  const refreshToken = randomBytes(30).toString('base64url'); // URL-safe base64

  const session = await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });

  return { user, session };
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64url'); // URL-safe base64
  const refreshToken = randomBytes(30).toString('base64url'); // URL-safe base64

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  const newSession = createSession();

  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  const updatedSession = await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });

  return { user, session: updatedSession };
};

export const requestResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '5m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
  });

  try {
    await sendEmail({
      from: env('SMTP_FROM'),
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};

export const resetPassword = async (payload) => {
  let entries;

  // Додаємо перевірку на наявність токена
  if (!payload.token) {
    throw createHttpError(400, 'Token is required.');
  }

  try {
    entries = jwt.verify(payload.token, env('JWT_SECRET'));
  } catch (error) {
    // Більш детальна обробка помилок JWT
    if (error.name === 'TokenExpiredError') {
      throw createHttpError(401, 'Token has expired.');
    } else if (error.name === 'JsonWebTokenError') {
      throw createHttpError(401, 'Invalid token.');
    } else {
      throw createHttpError(401, 'Token verification failed.');
    }
  }

  const user = await UsersCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (!payload.password) {
    throw createHttpError(400, 'Password is required.');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await UsersCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};

export const loginOrRegisterWithGoogle = async (user) => {
  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64url'); // URL-safe base64
  const refreshToken = randomBytes(30).toString('base64url'); // URL-safe base64

  const session = await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });

  return { user, session };
};
