import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  groups: Array,
  profession: { type: String, required: true },
  bio: { type: String, required: true },
});

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  groups: Array<string>;
  profession: string;
  bio: string;
}
