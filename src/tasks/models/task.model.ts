import * as mongoose from 'mongoose';

export const taskSchema = new mongoose.Schema({
  assignee: { type: String, required: true },
  userAssignedTo: { type: String, required: true },
  groupId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true, default: 'Unfinished' },
});
