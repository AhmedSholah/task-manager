import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

interface CheckBoxProps {
  checked: boolean;
  onPress: () => void;
}

export function CheckBox({ checked, onPress }: CheckBoxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`h-6 w-6 rounded-full border-2 justify-center items-center ${checked ? "bg-primary border-primary" : "border-gray-300 dark:border-gray-600"}`}
    >
      {checked && <MaterialIcons name="check" size={14} color="white" />}
    </TouchableOpacity>
  );
}
