export type Priority = "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  createdAt: Date;
  priority: Priority;
  completed: boolean;
  completedAt?: Date;
}
