import { Task } from "../types/task";

export const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Q4 Financial Planning",
    description:
      "Review departmental budget requests and finalize the Q4 allocation strategy before the board meeting.",
    dueDate: new Date("2023-11-15T09:00:00"),
    createdAt: new Date("2023-10-20"),
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    title: "Website Redesign Mockups",
    description:
      "Incorporate feedback from the design review, focusing on the new navigation structure and mobile responsiveness.",
    dueDate: new Date("2023-11-22T16:00:00"),
    createdAt: new Date("2023-10-30"),
    priority: "medium",
    completed: false,
  },
  {
    id: "3",
    title: "Call the dentist",
    description:
      "Schedule the bi-annual cleaning appointment and check availability for Saturday morning slots.",
    dueDate: new Date(),
    createdAt: new Date(),
    priority: "low",
    completed: true,
  },
  {
    id: "4",
    title: "Pay electricity bill",
    description:
      "Verify the meter reading on the invoice and process the payment via the online banking portal.",
    dueDate: new Date(),
    createdAt: new Date(),
    priority: "medium",
    completed: true,
  },
];
