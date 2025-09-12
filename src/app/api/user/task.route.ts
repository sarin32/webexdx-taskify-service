import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "./task.controller";
import { Router, HTTPMethod } from "@webexdx/koa-wrap/server";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router: Router = [
  {
    method: HTTPMethod.POST,
    path: "/",
    handler: createTask,
  },
  {
    method: HTTPMethod.DELETE,
    path: "/:taskId",
    handler: deleteTask,
  },
  {
    method: HTTPMethod.GET,
    path: "/:taskId",
    handler: getTask,
  },
  {
    method: HTTPMethod.PUT,
    path: "/:taskId",
    handler: updateTask,
  },
  {
    method: HTTPMethod.GET,
    path: "/",
    handler: getTasks,
  },
];

export default router;
