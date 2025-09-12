import { Router } from '@webexdx/koa-wrap/server';
import taskRoute from './user/task.route';
import { authMiddleware } from '../middlewares/auth.middleware';

const router: Router = [
  {
    middlewares: authMiddleware,
    path: '/task',
    children: taskRoute,
  },
];
export default router;
