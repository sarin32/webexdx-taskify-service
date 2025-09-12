import { Context } from "koa";
import {
  createTaskSchema,
  deleteTaskSchema,
  getTaskSchema,
  updateTaskSchema,
  getTasksSchema,
} from "./task.schema";
import { validateRequest } from "../../utils/schema-validator";
import { taskService } from "../../services/task/task.service";
import { objectId } from "../../utils/data-type-util";

export async function createTask(ctx: Context) {
  const { title, description, dueDate, priority } = validateRequest<{
    title: string;
    description?: string;
    dueDate: string;
    priority: "high" | "medium" | "low";
  }>(createTaskSchema, ctx.request.body);

  const { userId } = ctx.state.user;

  ctx.body = await taskService.createTask({
    title,
    description,
    userId,
    dueDate: new Date(dueDate),
    priority,
  });
}

export async function deleteTask(ctx: Context) {
  const { taskId } = validateRequest<{ taskId: string }>(
    deleteTaskSchema,
    ctx.params
  );

  const { userId } = ctx.state.user;

  await taskService.deleteTask({ taskId: objectId(taskId), userId });

  ctx.body = { message: "Task deleted successfully" };
}

export async function getTask(ctx: Context) {
  const { taskId } = validateRequest<{ taskId: string }>(
    getTaskSchema,
    ctx.params
  );

  const { userId } = ctx.state.user;

  ctx.body = await taskService.getTask({ taskId: objectId(taskId), userId });
}

export async function updateTask(ctx: Context) {
  const { taskId, description, isCompleted, title, dueDate, priority } =
    validateRequest<{
      taskId: string;
      title: string;
      description?: string;
      dueDate: string;
      priority: "high" | "medium" | "low";
      isCompleted: boolean;
    }>(updateTaskSchema, { ...ctx.params, ...ctx.request.body });

  const { userId } = ctx.state.user;

  await taskService.updateTask({
    taskId: objectId(taskId),
    userId,
    description,
    isCompleted,
    title,
    dueDate: new Date(dueDate),
    priority,
  });

  ctx.body = { message: "Task updated successfully" };
}

export async function getTasks(ctx: Context) {
  const { status, priority } = validateRequest<{
    status?: "all" | "completed" | "pending";
    priority?: "all" | "low" | "medium" | "high";
  }>(getTasksSchema, ctx.query);

  const { userId } = ctx.state.user;

  ctx.body = await taskService.getTaskList({
    userId,
    status: status || "all",
    priority: priority || "all",
  });
}
