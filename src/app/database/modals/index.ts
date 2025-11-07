import { COLLECTION_TASKS } from '../../config';
import connection from '../connection';
import type { TaskSchema } from './task.model';

export const tasksModal =
  connection.getCollection<TaskSchema>(COLLECTION_TASKS);
