import type { ObjectId } from '@i/common.interface';
import type { TaskSchema } from '../../database/modals/task.model';

export interface CreateTaskParams {
  userId: ObjectId;
  title: string;
  description?: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
}

export interface UpdateTaskParams {
  taskId: ObjectId;
  userId: ObjectId;
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate: Date;
}

export interface DeleteTaskParams {
  taskId: ObjectId;
  userId: ObjectId;
}

export interface GetTaskParams {
  taskId: ObjectId;
  userId: ObjectId;
}

export interface GetTaskListParams {
  userId: ObjectId;
  status: 'all' | 'completed' | 'pending';
  priority: 'all' | 'low' | 'medium' | 'high';
}

export interface TaskServiceInterface {
  createTask(params: CreateTaskParams): Promise<{ id: ObjectId }>;
  getTask(params: GetTaskParams): Promise<TaskSchema | null>;
  updateTask(params: UpdateTaskParams): Promise<void>;
  getTaskList(params: GetTaskListParams): Promise<TaskSchema[]>;
  deleteTask(params: DeleteTaskParams): Promise<void>;
}
