import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface FilterSortBarProps {
  onSortPress: () => void;
  onFilterPress: () => void;
  activeFilterCount: number;
}

export function FilterSortBar({
  onSortPress,
  onFilterPress,
  activeFilterCount,
}: FilterSortBarProps) {
  return (
    <View className="flex-row justify-between items-center gap-3 mt-4 pb-2">
      <TouchableOpacity
        onPress={onSortPress}
        activeOpacity={0.7}
        className="flex-row items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <MaterialIcons name="sort" size={18} color="#6B7280" />
        <Text className="text-gray-700 dark:text-gray-200 text-sm font-semibold">
          Sort by: Deadline
        </Text>
        <MaterialIcons name="expand-more" size={18} color="#9CA3AF" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onFilterPress}
        activeOpacity={0.7}
        className="flex-row items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 dark:bg-white shadow-md"
      >
        <MaterialIcons name="filter-list" size={18} color="white" />
        {/* Note: In dark mode, text is black, so icon should be black too on white bg. */}
        <Text className="text-white dark:text-gray-900 text-sm font-bold">
          Filter
        </Text>
        {activeFilterCount > 0 && (
          <View className="items-center justify-center w-5 h-5 rounded-full bg-white/20 dark:bg-black/10">
            <Text className="text-[10px] text-white dark:text-black font-bold">
              {activeFilterCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
