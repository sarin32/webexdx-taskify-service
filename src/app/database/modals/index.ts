import {
  COLLECTION_TASKS,
} from '../../config';
import connection from '../connection';
import { TaskSchema } from './task.model';

export const tasksModal =
  connection.getCollection<TaskSchema>(COLLECTION_TASKS);
