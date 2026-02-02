import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Task } from "../types/task";
import { Badge } from "./Badge";
import { CheckBox } from "./CheckBox";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onPress: (id: string) => void;
}

export function TaskCard({
  task,
  onToggle,
  onDelete,
  onEdit,
  onPress,
}: TaskCardProps) {
  const formatDate = (date: Date) => {
    return (
      date.toLocaleDateString("en-US", { day: "numeric", month: "short" }) +
      ", " +
      date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    );
  };

  const renderRightActions = () => {
    return (
      <View className="flex-row w-[120px] h-full">
        <TouchableOpacity
          onPress={() => onEdit(task.id)}
          className="flex-1 bg-blue-500 justify-center items-center"
        >
          <MaterialIcons name="edit" size={20} color="white" />
          <Text className="text-[10px] font-bold mt-1 text-white">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(task.id)}
          className="flex-1 bg-red-500 justify-center items-center rounded-r-2xl"
        >
          <MaterialIcons name="delete" size={20} color="white" />
          <Text className="text-[10px] font-bold mt-1 text-white">Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="mb-3 rounded-2xl bg-background-light dark:bg-background-dark shadow-sm overflow-hidden">
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onPress(task.id)}
          className="flex-row items-center gap-4 bg-white dark:bg-card-dark p-5"
        >
          <View className="shrink-0 self-start mt-0.5">
            <CheckBox
              checked={task.completed}
              onPress={() => onToggle(task.id)}
            />
          </View>

          <View className="flex-1 min-w-0">
            <Text
              className={`text-[15px] font-bold leading-snug ${task.completed ? "text-gray-500 line-through" : "text-gray-900 dark:text-white"}`}
            >
              {task.title}
            </Text>
            <Text
              className={`text-[13px] leading-relaxed mt-1 line-clamp-2 ${task.completed ? "text-gray-400 line-through" : "text-gray-600 dark:text-gray-300"}`}
              numberOfLines={2}
            >
              {task.description}
            </Text>

            {!task.completed && (
              <View className="flex-row items-center flex-wrap gap-x-2 gap-y-1 mt-2.5">
                <View
                  className={`flex-row items-center gap-1.5 ${task.priority === "high" ? "text-red-600" : task.priority === "medium" ? "text-orange-600" : "text-emerald-600"}`}
                >
                  <MaterialIcons
                    name="event"
                    size={16}
                    color={
                      task.priority === "high"
                        ? "#DC2626"
                        : task.priority === "medium"
                          ? "#EA580C"
                          : "#059669"
                    }
                  />
                  <Text
                    className={`text-xs font-bold ${task.priority === "high" ? "text-red-600" : task.priority === "medium" ? "text-orange-600" : "text-emerald-600"}`}
                  >
                    {formatDate(task.dueDate)}
                  </Text>
                </View>
                <Text className="text-gray-300 dark:text-gray-600 text-[10px]">
                  •
                </Text>
                <Text className="text-xs text-gray-400 dark:text-gray-500 font-normal">
                  Created{" "}
                  {task.createdAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
              </View>
            )}

            {task.completed && (
              <View className="flex-row items-center gap-1.5 mt-2.5">
                <MaterialIcons name="check-circle" size={16} color="#9CA3AF" />
                <Text className="text-xs text-gray-400 font-medium">
                  Completed{" "}
                  {task.completedAt ? formatDate(task.completedAt) : ""}
                </Text>
              </View>
            )}
          </View>

          <Badge text={task.priority} variant={task.priority} />
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
}
