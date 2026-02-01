import React from "react";
import { Text, View } from "react-native";

interface BadgeProps {
  text: string;
  variant: "high" | "medium" | "low";
}

export function Badge({ text, variant }: BadgeProps) {
  const getStyles = () => {
    switch (variant) {
      case "high":
        return "bg-priority-high";
      case "medium":
        return "bg-priority-medium";
      case "low":
        return "bg-priority-low";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <View
      className={`shrink-0 self-start inline-flex items-center justify-center h-8 px-3 rounded-full shadow-sm ${getStyles()}`}
    >
      <Text className="text-[11px] font-bold uppercase tracking-wide text-white">
        {text}
      </Text>
    </View>
  );
}
