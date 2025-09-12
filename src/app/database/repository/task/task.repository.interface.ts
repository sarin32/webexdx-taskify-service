import { ObjectId } from "@i/common.interface";

export type Priority = "low" | "medium" | "high";

export interface CreateTaskParams {
  userId: ObjectId;
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: Date;
}

export interface UpdateTaskParams {
  taskId: ObjectId;
  title?: string;
  description?: string;
  isCompleted?: boolean;
  priority?: Priority;
  dueDate?: Date;
}

export interface GetTaskParams {
  taskId: ObjectId;
  userId: ObjectId;
}

export interface GetTaskListParams {
  userId: ObjectId;
  status?: "all" | "pending" | "completed";
  priority?: "all" | Priority;
  projection?: Record<string, 1 | 0>;
}

export interface DeleteTaskParams {
  taskId: ObjectId;
  userId?: ObjectId;
}

export interface IsTaskExistsParams {
  taskId: ObjectId;
  userId: ObjectId;
}

export interface TaskRepositoryInterface {
  createTask(params: CreateTaskParams): Promise<{ id: ObjectId }>;
  isTaskExists(params: IsTaskExistsParams): Promise<boolean>;
  getTask(params: GetTaskParams): Promise<any>;
  updateTask(params: UpdateTaskParams): Promise<void>;
  getTaskList(params: GetTaskListParams): Promise<any[]>;
  deleteTask(params: DeleteTaskParams): Promise<void>;
}
