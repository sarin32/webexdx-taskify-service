import type { Document, ObjectId } from 'mongodb';

export type Priority = 'low' | 'medium' | 'high';

export interface TaskSchema extends Document {
  userId: ObjectId; // reference to the user who owns the task
  title: string;
  description?: string;
  priority: Priority;
  isCompleted: boolean;
  createdAt: Date;
  dueDate?: Date;
  completedAt?: Date;
}
