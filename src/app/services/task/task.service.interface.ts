import { ObjectId } from "@i/common.interface";

export interface CreateTaskParams {
  userId: ObjectId;
  title: string;
  description?: string;
  dueDate: Date;
  priority: "high" | "medium" | "low";
}

export interface UpdateTaskParams {
  taskId: ObjectId;
  userId: ObjectId;
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: "high" | "medium" | "low";
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
  status: "all" | "completed" | "pending";
  priority: "all" | "low" | "medium" | "high";
}

export interface TaskServiceInterface {
  createTask(params: CreateTaskParams): Promise<any>;
  getTask(params: GetTaskParams): Promise<any>;
  updateTask(params: UpdateTaskParams): Promise<any>;
  getTaskList(params: GetTaskListParams): Promise<any[]>;
  deleteTask(params: DeleteTaskParams): Promise<void>;
}
