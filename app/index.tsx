import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB } from "../components/FAB";
import { FilterSortBar } from "../components/FilterSortBar";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { TaskCard } from "../components/TaskCard";
import { INITIAL_TASKS } from "../constants/tasks";
import { Task } from "../types/task";

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
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
      <View className="px-6 flex-1">
        <Header />
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <FilterSortBar
          onSortPress={() => {}}
          onFilterPress={() => {}}
          activeFilterCount={2}
        />

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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
        />
      </View>
      <FAB onPress={handleAdd} />
    </SafeAreaView>
  );
}
