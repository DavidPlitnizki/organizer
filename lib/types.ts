export type TaskStatus = 'in progress' | 'done';

export type TaskType = {
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  owner: string;
};
