

export type CreatedTasks = Task[];

export interface Task {
  index: number;
  course: string;
  description: string;
  dueDate: Date;
}
