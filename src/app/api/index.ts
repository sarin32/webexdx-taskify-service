import type { Router } from '@webexdx/koa-wrap/server';
import { authMiddleware } from '../middlewares/auth.middleware';
import taskRoute from './user/task.route';

const router: Router = [
  {
    middlewares: authMiddleware,
    path: '/task',
    children: taskRoute,
  },
];
export default router;
