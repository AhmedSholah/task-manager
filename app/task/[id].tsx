import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTasks } from "../../context/TaskContext";

export default function TaskDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { tasks, toggleTaskCompletion, deleteTask } = useTasks();

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-background-light dark:bg-background-dark">
        <Text className="text-gray-500">Task not found</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="px-4 py-2 mt-4 rounded-lg bg-primary"
        >
          <Text className="font-bold text-white">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteTask(task.id);
          router.back();
        },
      },
    ]);
  };

  const handleEdit = () => {
    router.push(`/edit/${task.id}`);
  };

  const completed = task.completed;
  const priorityColor =
    task.priority === "high"
      ? "text-priority-high"
      : task.priority === "medium"
      ? "text-priority-medium"
      : "text-priority-low";
  const priorityBg =
    task.priority === "high"
      ? "bg-priority-high/10"
      : task.priority === "medium"
      ? "bg-priority-medium/10"
      : "bg-priority-low/10";
  const priorityRing =
    task.priority === "high"
      ? "border-priority-high/20"
      : task.priority === "medium"
      ? "border-priority-medium/20"
      : "border-priority-low/20";

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  return (
    <SafeAreaView
      className="flex-1 bg-background-light dark:bg-background-dark"
      edges={["top", "left", "right"]}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 pt-2 pb-2">
        <TouchableOpacity
          onPress={() => router.back()}
          className="justify-center items-center -ml-2 w-10 h-10 rounded-full active:bg-gray-200 dark:active:bg-gray-800"
        >
          <MaterialIcons
            name="arrow-back-ios-new"
            size={24}
            className="text-gray-900 dark:text-white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEdit} className="px-2 py-1">
          <Text className="text-primary text-[15px] font-bold">Edit</Text>
        </TouchableOpacity>
      </View>

      <View className="relative flex-1">
        <ScrollView
          className="flex-1 px-6 pt-4 mb-10"
          contentContainerStyle={{ paddingBottom: 150 }}
          showsVerticalScrollIndicator={false}
        >
          {completed && (
            <View className="mb-8">
              <View className="flex-row gap-2 items-center mb-2">
                <View className="flex-row items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30">
                  <MaterialIcons
                    name="check-circle"
                    size={16}
                    color="#15803d"
                  />
                  <Text className="text-[12px] font-bold text-green-700 dark:text-green-400">
                    Completed on{" "}
                    {task.completedAt
                      ? formatDate(new Date(task.completedAt))
                      : "Unknown"}
                  </Text>
                </View>
              </View>
            </View>
          )}

          <Text
            className={`text-[32px] font-extrabold leading-tight tracking-tight mb-8 ${
              completed
                ? "text-gray-400 line-through dark:text-gray-500"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {task.title}
          </Text>

          <View className="flex-row justify-between items-center mb-10">
            <View
              className={`justify-center px-4 h-8 rounded-full border ${priorityBg} ${priorityRing}`}
            >
              <Text
                className={`font-bold tracking-wide uppercase text-[11px] ${priorityColor}`}
              >
                {task.priority} Priority
              </Text>
            </View>

            <View className="flex-row gap-3 items-center">
              <Text className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Complete
              </Text>
              <TouchableOpacity
                onPress={() => toggleTaskCompletion(task.id)}
                activeOpacity={0.8}
              >
                <View
                  className={`w-12 h-7 rounded-full justify-center px-[2px] ${
                    completed ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  <View
                    className={`h-6 w-6 bg-white rounded-full shadow-sm transform transition-transform ${
                      completed ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-12">
            <Text className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Description
            </Text>
            <Text className="text-gray-800 dark:text-gray-200 text-[17px] leading-relaxed font-medium">
              {task.description || "No description provided."}
            </Text>
          </View>

          <View className="mt-auto">
            <Text className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Details
            </Text>
            <View className="flex-row gap-4">
              <View className="flex-1 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm dark:bg-card-dark dark:border-gray-800">
                <View className="flex-row gap-2 items-center mb-1">
                  <MaterialIcons
                    name="event"
                    size={20}
                    className="text-priority-high"
                    color={task.priority === "high" ? "#EF4444" : "#9CA3AF"}
                  />
                  <Text className="text-[11px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    Deadline
                  </Text>
                </View>
                <Text className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatDate(new Date(task.dueDate))}
                </Text>
                <Text className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {formatTime(new Date(task.dueDate))}
                </Text>
              </View>

              <View className="flex-1 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm dark:bg-card-dark dark:border-gray-800">
                <View className="flex-row gap-2 items-center mb-1">
                  <MaterialIcons
                    name="history"
                    size={20}
                    className="text-gray-400"
                    color="#9CA3AF"
                  />
                  <Text className="text-[11px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    Created
                  </Text>
                </View>
                <Text className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatDate(new Date(task.createdAt))}
                </Text>
                <Text className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {formatTime(new Date(task.createdAt))}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View className="absolute right-0 bottom-0 left-0 p-6 border-t border-gray-100 bg-white/90 dark:bg-background-dark/90 dark:border-gray-800">
          <View className="flex-col gap-3">
            <TouchableOpacity
              onPress={() => toggleTaskCompletion(task.id)}
              className={`w-full h-14 rounded-2xl flex-row items-center justify-center gap-2.5 shadow-lg active:scale-[0.98] ${
                completed
                  ? "bg-gray-500 shadow-gray-500/30"
                  : "bg-primary shadow-primary/30"
              }`}
            >
              <MaterialIcons
                name={completed ? "replay" : "check"}
                size={24}
                color="white"
                className="font-semibold"
              />
              <Text className="text-white font-bold text-[17px]">
                {completed ? "Mark as Incomplete" : "Mark as Complete"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDelete}
              className="w-full h-14 rounded-2xl border-2 border-priority-high flex-row items-center justify-center gap-2.5 active:scale-[0.98] active:bg-priority-high/5"
            >
              <MaterialIcons
                name="delete"
                size={24}
                color="#EF4444"
                className="font-semibold"
              />
              <Text className="text-priority-high font-bold text-[17px]">
                Delete Task
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
