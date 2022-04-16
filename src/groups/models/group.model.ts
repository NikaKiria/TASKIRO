import * as mongoose from 'mongoose';

export const groupSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  members: { type: Array, required: true },
  author: { type: String, required: true },
});
