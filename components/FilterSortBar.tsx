import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

export type SortOption =
  | "Deadline"
  | "Priority"
  | "Date Created"
  | "Alphabetical";

export type StatusFilters = {
  active: boolean;
  completed: boolean;
};

export type PriorityFilters = {
  high: boolean;
  medium: boolean;
  low: boolean;
};

interface FilterSortBarProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  statusFilters: StatusFilters;
  onStatusFilterChange: (filters: StatusFilters) => void;
  priorityFilters: PriorityFilters;
  onPriorityFilterChange: (filters: PriorityFilters) => void;
}

export function FilterSortBar({
  sortOption,
  onSortChange,
  statusFilters,
  onStatusFilterChange,
  priorityFilters,
  onPriorityFilterChange,
}: FilterSortBarProps) {
  const [openDropdown, setOpenDropdown] = useState<"sort" | "filter" | null>(
    null
  );

  // Local state for filters to support "Apply" button logic
  const [tempStatusFilters, setTempStatusFilters] =
    useState<StatusFilters>(statusFilters);
  const [tempPriorityFilters, setTempPriorityFilters] =
    useState<PriorityFilters>(priorityFilters);

  // Reset local state when dropdown opens
  useEffect(() => {
    if (openDropdown === "filter") {
      setTempStatusFilters(statusFilters);
      setTempPriorityFilters(priorityFilters);
    }
  }, [openDropdown, statusFilters, priorityFilters]);

  const toggleDropdown = (name: "sort" | "filter") => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeDropdown_ = () => setOpenDropdown(null);

  const applyFilters = () => {
    onStatusFilterChange(tempStatusFilters);
    onPriorityFilterChange(tempPriorityFilters);
    closeDropdown_();
  };

  const resetFilters = () => {
    setTempStatusFilters({ active: true, completed: true });
    setTempPriorityFilters({ high: true, medium: true, low: true });
  };

  // Calculate active filter count based on committed props, not temp state
  const activeFilterCount =
    (statusFilters.active ? 1 : 0) +
    (statusFilters.completed ? 1 : 0) +
    (priorityFilters.high ? 1 : 0) +
    (priorityFilters.medium ? 1 : 0) +
    (priorityFilters.low ? 1 : 0);

  return (
    <View className="z-50 flex-row gap-3 justify-between items-start pb-2 mt-4">
      {/* Backdrop to close dropdowns */}
      {openDropdown && (
        <Pressable
          className="absolute -top-full -left-full w-[1000px] h-[2000px] bg-transparent z-0"
          onPress={closeDropdown_}
        />
      )}

      {/* Sort Dropdown & Button */}
      <View className="relative z-10 w-[48%]">
        <TouchableOpacity
          onPress={() => toggleDropdown("sort")}
          activeOpacity={0.7}
          className="flex-row items-center justify-between px-4 py-2.5 rounded-xl bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <View className="flex-row gap-2 items-center">
            <MaterialIcons name="sort" size={18} className="text-gray-500" />
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {sortOption}
            </Text>
          </View>
          <MaterialIcons
            name="expand-more"
            size={18}
            className="text-gray-400"
          />
        </TouchableOpacity>

        {/* Sort Dropdown Menu */}
        {openDropdown === "sort" && (
          <View className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-card-dark rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden p-1.5 z-20">
            {["Deadline", "Priority", "Date Created", "Alphabetical"].map(
              (option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => {
                    onSortChange(option as SortOption);
                    closeDropdown_();
                  }}
                  className={`flex-row items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sortOption === option
                      ? "bg-gray-100 dark:bg-gray-700/50 text-gray-900 dark:text-white"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  <Text
                    className={
                      sortOption === option
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-300"
                    }
                  >
                    {option}
                  </Text>
                  {sortOption === option && (
                    <MaterialIcons name="check" size={16} color="#39E079" />
                  )}
                </TouchableOpacity>
              )
            )}
          </View>
        )}
      </View>

      {/* Filter Dropdown & Button */}
      <View className="relative z-10 flex-1">
        <TouchableOpacity
          onPress={() => toggleDropdown("filter")}
          activeOpacity={0.7}
          className="w-full flex-row items-center justify-between px-4 py-2.5 rounded-xl bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <View className="flex-row gap-2 items-center">
            <MaterialIcons
              name="filter-list"
              size={18}
              className="text-gray-500"
            />
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Filter
            </Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            {activeFilterCount > 0 && (
              <View className="flex justify-center items-center w-5 h-5 rounded-full bg-primary/10">
                <Text className="text-primary text-[10px] font-bold">
                  {activeFilterCount}
                </Text>
              </View>
            )}
            <MaterialIcons
              name="expand-more"
              size={18}
              className="text-gray-400"
            />
          </View>
        </TouchableOpacity>

        {/* Filter Dropdown Menu */}
        {openDropdown === "filter" && (
          <View className="absolute top-full right-0 mt-2 w-[240px] bg-white dark:bg-card-dark rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-20">
            <View className="p-3 space-y-3">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-white">
                  Filters
                </Text>
                <TouchableOpacity onPress={resetFilters}>
                  <Text className="text-xs font-medium text-primary">
                    Reset
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Status Section */}
              <View>
                <Text className="px-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Status
                </Text>
                <View className="space-y-0.5">
                  {[
                    { label: "Active", key: "active" },
                    { label: "Completed", key: "completed" },
                  ].map((item) => (
                    <TouchableOpacity
                      key={item.key}
                      onPress={() =>
                        setTempStatusFilters((p) => ({
                          ...p,
                          [item.key]: !p[item.key as keyof StatusFilters],
                        }))
                      }
                      className="flex-row items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <View
                        className={`relative flex items-center justify-center w-4 h-4 rounded border ${
                          tempStatusFilters[item.key as keyof StatusFilters]
                            ? "bg-primary border-primary"
                            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        }`}
                      >
                        {tempStatusFilters[item.key as keyof StatusFilters] && (
                          <MaterialIcons name="check" size={12} color="white" />
                        )}
                      </View>
                      <Text className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View className="h-px bg-gray-100 dark:bg-gray-700" />

              {/* Priority Section */}
              <View>
                <Text className="px-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Priority
                </Text>
                <View className="space-y-0.5">
                  {[
                    { label: "High", key: "high", color: "bg-priority-high" },
                    {
                      label: "Medium",
                      key: "medium",
                      color: "bg-priority-medium",
                    },
                    { label: "Low", key: "low", color: "bg-priority-low" },
                  ].map((item) => (
                    <TouchableOpacity
                      key={item.key}
                      onPress={() =>
                        setTempPriorityFilters((p) => ({
                          ...p,
                          [item.key]: !p[item.key as keyof PriorityFilters],
                        }))
                      }
                      className="flex-row items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <View
                        className={`relative flex items-center justify-center w-4 h-4 rounded border ${
                          tempPriorityFilters[item.key as keyof PriorityFilters]
                            ? "bg-primary border-primary"
                            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        }`}
                      >
                        {tempPriorityFilters[
                          item.key as keyof PriorityFilters
                        ] && (
                          <MaterialIcons name="check" size={12} color="white" />
                        )}
                      </View>
                      <View className="flex-row gap-2 items-center">
                        <View
                          className={`w-2 h-2 rounded-full ${item.color}`}
                        />
                        <Text className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {item.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Apply Button */}
              <View className="pt-1">
                <TouchableOpacity
                  onPress={applyFilters}
                  className="items-center py-2 w-full bg-gray-900 rounded-lg dark:bg-white"
                >
                  <Text className="text-xs font-bold tracking-wide text-white uppercase dark:text-gray-900">
                    Apply Filters
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
