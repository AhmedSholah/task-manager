import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Task } from "../types/task";

interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

// Create the TaskContext with default values
const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks).map((task: any) => ({
          ...task,
          dueDate: new Date(task.dueDate),
          createdAt: new Date(task.createdAt),
          completedAt: task.completedAt
            ? new Date(task.completedAt)
            : undefined,
        }));
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error("Failed to load tasks", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTasks = async (tasksToSave: Task[]) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasksToSave));
    } catch (error) {
      console.error("Failed to save tasks", error);
    }
  };

  // Add a new task to the list
  const addTask = (task: Task) => {
    setTasks((prev) => [task, ...prev]);
  };

  // Update an existing task
  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  // Delete a task by ID
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle task completion status
  const toggleTaskCompletion = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const completed = !t.completed;
          return {
            ...t,
            completed,
            completedAt: completed ? new Date() : undefined,
          };
        }
        return t;
      })
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  // Custom hook to access the TaskContext values
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
