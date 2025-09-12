import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().trim().min(1).max(50).required(),
  description: Joi.string().trim().max(100).optional(),
  dueDate: Joi.string().isoDate().required(),
  priority: Joi.string().valid("high", "medium", "low").required(),
});

export const deleteTaskSchema = Joi.object({
  taskId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
});

export const getTaskSchema = Joi.object({
  taskId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
});

export const updateTaskSchema = Joi.object({
  taskId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
  title: Joi.string().trim().min(1).max(50).required(),
  description: Joi.string().trim().max(100).optional(),
  dueDate: Joi.string().isoDate().required(),
  priority: Joi.string().valid("high", "medium", "low").required(),
  isCompleted: Joi.boolean().required(),
});

export const getTasksSchema = Joi.object({
  status: Joi.string()
    .valid("all", "completed", "pending")
    .optional(),
  priority: Joi.string()
    .valid("all", "low", "medium", "high")
    .optional(),
});
