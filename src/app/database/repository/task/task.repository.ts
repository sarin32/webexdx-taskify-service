import { tasksModal } from "../../modals";
import {
  CreateTaskParams,
  UpdateTaskParams,
  GetTaskParams,
  GetTaskListParams,
  DeleteTaskParams,
  IsTaskExistsParams,
  TaskRepositoryInterface,
} from "./task.repository.interface";

class TaskRepository implements TaskRepositoryInterface {
  private readonly model = tasksModal;

  async createTask({ userId, title, description, priority, dueDate }: CreateTaskParams) {
    const result = await this.model.insertOne({
      userId,
      title: title || "",
      description: description || "",
      createdAt: new Date(),
      dueDate,
      priority,
      isCompleted: false,
    });

    if (!result.acknowledged) {
      throw new Error("Failed to create task");
    }

    return { id: result.insertedId };
  }

  async isTaskExists({ taskId, userId }: IsTaskExistsParams) {
    const task = await this.model.findOne(
      { _id: taskId, userId },
      { projection: { _id: 1 } }
    );
    return Boolean(task);
  }

  async getTask({ taskId, userId }: GetTaskParams) {
    return await this.model.findOne({ _id: taskId, userId });
  }

  async updateTask({ taskId, title, description, isCompleted, priority, dueDate }: UpdateTaskParams) {
    const setData: Record<string, any> = {};
    const unsetData: Record<string, any> = {};

    if (title) setData.title = title;
    if (description) setData.description = description;
    if (priority) setData.priority = priority;
    if (dueDate) setData.dueDate = dueDate;

    if (isCompleted !== undefined) setData.isCompleted = isCompleted;
    if (isCompleted) setData.completedAt = new Date();
    if (isCompleted === false) unsetData.completedAt = "";

    const response = await this.model.updateOne(
      { _id: taskId },
      { $set: setData, $unset: unsetData }
    );

    if (!response.acknowledged || response.modifiedCount !== 1) {
      throw new Error("Failed to update task data");
    }
  }

  async getTaskList({ userId, status = "all", priority = "all", projection = {} }: GetTaskListParams) {
    let statusCond: Record<string, any> = { isCompleted: { $in: [true, false] } };
    if (status === "pending") statusCond = { isCompleted: false };
    if (status === "completed") statusCond = { isCompleted: true };

    let priorityCond: Record<string, any> = { priority: { $in: ["low", "medium", "high"] } };
    if (priority !== "all") priorityCond = { priority };

    const tasks = await this.model
      .find({ userId, ...statusCond, ...priorityCond }, { projection })
      .sort({ createdAt: -1 })
      .toArray();

    return tasks;
  }

  async deleteTask({ taskId }: DeleteTaskParams) {
    const response = await this.model.deleteOne({ _id: taskId });

    if (!response.acknowledged || response.deletedCount !== 1) {
      throw new Error("Failed to delete task data");
    }
  }
}

export const taskRepository = new TaskRepository();
