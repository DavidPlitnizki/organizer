import { z } from 'zod';
import { Timestamp } from 'firebase/firestore';

export const taskStatusList = ['active', 'done'] as const;
export const TaskStatusSchema = z.enum(taskStatusList);
export type TaskStatusType = z.infer<typeof TaskStatusSchema>;

const timestampOrDate = z
  .union([z.instanceof(Date), z.instanceof(Timestamp)])
  .transform((val) => (val instanceof Timestamp ? val.toDate() : val));

export type TaskType = {
  title: string;
  description: string;
  status: TaskStatusType;
  createdAt: string;
  owner: string;
};

export const TaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  createdAt: timestampOrDate,
  status: TaskStatusSchema,
  owner: z.string(),
});
export type TaskData = z.infer<typeof TaskSchema>;

export type TaskDataWithID = TaskData & { id: string };
