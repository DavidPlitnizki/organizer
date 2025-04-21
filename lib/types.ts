import { z } from 'zod';
import { Timestamp } from 'firebase/firestore';

export const taskStatusList = ['active', 'done'] as const;
export const TaskStatusSchema = z.enum(taskStatusList);
export type TaskStatusType = z.infer<typeof TaskStatusSchema>;

const timestampInstance = z.instanceof(Timestamp);

export type TaskType = {
  title: string;
  description: string;
  status: TaskStatusType;
  createdAt: Timestamp;
  owner: string;
};

export const TaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  createdAt: timestampInstance,
  status: TaskStatusSchema,
  owner: z.string(),
});
export type TaskData = z.infer<typeof TaskSchema>;

export type TaskDataWithID = TaskData & { id: string };
