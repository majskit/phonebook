import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST } = process.env;

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
