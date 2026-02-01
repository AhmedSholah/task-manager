export type Priority = "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date; // Keep as Date object for sorting
  createdAt: Date;
  priority: Priority;
  completed: boolean;
}
