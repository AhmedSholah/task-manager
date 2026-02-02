import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { TaskForm } from "../../components/TaskForm";
import { useTasks } from "../../context/TaskContext";
import { Task } from "../../types/task";

export default function EditTask() {
  const { id } = useLocalSearchParams();
  const { tasks } = useTasks();
  const [task, setTask] = useState<Task | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const foundTask = tasks.find((t) => t.id === id);
      if (foundTask) {
        setTask(foundTask);
      } else {
        // Handle task not found, maybe redirect back
        router.replace("/");
      }
    }
  }, [id, tasks]);

  if (!task) {
    return (
      <View className="flex-1 justify-center items-center bg-background-light dark:bg-background-dark">
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return <TaskForm mode="edit" initialData={task} />;
}
