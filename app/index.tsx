import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB } from "../components/FAB";
import { FilterSortBar } from "../components/FilterSortBar";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { TaskCard } from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";
// QuickFilterBar handles its own types usually, but let's check imports.
import { Alert } from "react-native";

export default function Home() {
  const router = useRouter();
  const { tasks, toggleTaskCompletion, deleteTask, isLoading } = useTasks(); // Use Context
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by completion status: completed tasks go to the bottom
      if (a.completed === b.completed) {
        return 0;
      }
      return a.completed ? 1 : -1;
    });

  const handleToggle = (id: string) => {
    toggleTaskCompletion(id);
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTask(id),
      },
    ]);
  };

  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  const handleAdd = () => {
    router.push("/add");
  };

  return (
    <SafeAreaView
      className="flex-1 bg-background-light dark:bg-background-dark"
      edges={["top", "left", "right"]}
    >
      <StatusBar style="dark" />
      <View className="flex-1 px-6">
        <Header />
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <FilterSortBar
          onSortPress={() => {}}
          onFilterPress={() => {}}
          activeFilterCount={2}
        />

        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#10B981" />
          </View>
        ) : (
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskCard
                task={item}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            )}
            ListEmptyComponent={() => (
              <View className="flex-1 justify-center items-center mt-20">
                <MaterialIcons
                  name={tasks.length === 0 ? "assignment" : "search-off"}
                  size={64}
                  color="#9CA3AF"
                />
                <Text className="mt-4 text-lg font-medium text-gray-500">
                  {tasks.length === 0 ? "No tasks yet" : "No tasks found"}
                </Text>
                <Text className="mt-2 text-sm text-center text-gray-400">
                  {tasks.length === 0
                    ? "Tap the + button to create your first task"
                    : "Try adjusting your search or filters"}
                </Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <FAB onPress={handleAdd} />
    </SafeAreaView>
  );
}
