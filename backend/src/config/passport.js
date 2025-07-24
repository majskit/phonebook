import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UsersCollection } from '../db/models/user.js';
import { env } from '../utils/env.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: env('GOOGLE_CLIENT_ID'),
      clientSecret: env('GOOGLE_CLIENT_SECRET'),
      callbackURL: `${env('APP_DOMAIN')}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UsersCollection.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        user = await UsersCollection.findOne({
          email: profile.emails[0].value,
        });

        if (user) {
          user.googleId = profile.id;
          await user.save();
          return done(null, user);
        }

        user = await UsersCollection.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0]?.value || null,
          password: null,
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UsersCollection.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
