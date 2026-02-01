import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

export function FAB({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      className="absolute bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/30 active:scale-95"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <MaterialIcons name="add" size={32} color="white" />
    </TouchableOpacity>
  );
}
