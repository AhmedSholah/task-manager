import React from "react";
import { Text, View } from "react-native";

export function Header() {
  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <View className="flex-row justify-between items-end my-6">
      <View>
        <Text className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wide leading-normal">
          {dateString}
        </Text>
        <Text className="text-gray-900 dark:text-white tracking-tight text-[32px] font-extrabold leading-tight mt-1">
          My Tasks
        </Text>
      </View>
    </View>
  );
}
