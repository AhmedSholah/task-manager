import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View className="relative mb-4">
      <View className="flex absolute inset-y-0 left-0 z-10 justify-center items-center pl-3 h-full">
        <MaterialIcons name="search" size={20} color="#9CA3AF" />
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search tasks..."
        placeholderTextColor="#9CA3AF"
        className="py-3 pr-4 pl-10 w-full text-sm text-gray-900 bg-white rounded-2xl shadow-sm dark:bg-card-dark dark:text-white"
        style={{ paddingLeft: 40 }}
      />
    </View>
  );
}
