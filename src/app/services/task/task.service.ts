import { NotFoundError } from '@webexdx/koa-wrap/errors';
import { taskRepository } from '../../database';
import type {
  CreateTaskParams,
  DeleteTaskParams,
  GetTaskListParams,
  GetTaskParams,
  TaskServiceInterface,
  UpdateTaskParams,
} from './task.service.interface';

class TaskService implements TaskServiceInterface {
  private readonly repository = taskRepository;

  async createTask({
    userId,
    title,
    description,
    dueDate,
    priority,
  }: CreateTaskParams) {
    return this.repository.createTask({
      userId,
      title,
      description,
      dueDate,
      priority,
    });
  }

  async getTask({ userId, taskId }: GetTaskParams) {
    return this.repository.getTask({ userId, taskId });
  }

  async updateTask({
    taskId,
    userId,
    title,
    description,
    isCompleted,
    priority,
    dueDate,
  }: UpdateTaskParams) {
    const isTaskExist = await this.repository.isTaskExists({ taskId, userId });

    if (!isTaskExist) {
      throw new NotFoundError('Task not found');
    }

    return this.repository.updateTask({
      taskId,
      title,
      description,
      isCompleted,
      priority,
      dueDate,
    });
  }

  async getTaskList({ userId, status, priority }: GetTaskListParams) {
    return this.repository.getTaskList({ userId, status, priority });
  }

  async deleteTask({ taskId, userId }: DeleteTaskParams) {
    const isTaskExist = await this.repository.isTaskExists({ taskId, userId });

    if (!isTaskExist) {
      throw new NotFoundError('Task not found');
    }

    await this.repository.deleteTask({ taskId });
  }
}

export const taskService = new TaskService();
