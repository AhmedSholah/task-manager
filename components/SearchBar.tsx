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
      <View className="absolute inset-y-0 left-0 flex items-center justify-center pl-3 h-full z-10">
        <MaterialIcons name="search" size={20} color="#9CA3AF" />
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search tasks..."
        placeholderTextColor="#9CA3AF"
        className="w-full py-3 pl-10 pr-4 rounded-2xl bg-white dark:bg-card-dark shadow-sm text-sm text-gray-900 dark:text-white"
        style={{ paddingLeft: 40 }} // NativeWind sometimes misses padding on TextInput if not explicit or platform variance
      />
    </View>
  );
}
