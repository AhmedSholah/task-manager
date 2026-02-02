import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTasks } from "../context/TaskContext";
import { Task } from "../types/task";

type FormData = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
};

interface TaskFormProps {
  mode: "create" | "edit";
  initialData?: Task;
}

export function TaskForm({ mode, initialData }: TaskFormProps) {
  const router = useRouter();
  const navigation = useNavigation();
  const { addTask, updateTask } = useTasks();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      priority: initialData?.priority || "medium",
    },
  });

  const [date, setDate] = useState(
    initialData?.dueDate ? new Date(initialData.dueDate) : new Date(),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Web-specific refs for hidden inputs
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const titleValue = watch("title");

  // Web-specific date/time handlers
  const handleWebDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    if (selectedDate) {
      const [year, month, day] = selectedDate.split("-").map(Number);
      const newDate = new Date(date);
      newDate.setFullYear(year, month - 1, day);
      setDate(newDate);
    }
  };

  const handleWebTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTime = event.target.value;
    if (selectedTime) {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes);
      setDate(newDate);
    }
  };

  const openWebDatePicker = () => {
    if (Platform.OS === "web" && dateInputRef.current) {
      dateInputRef.current.click();
    } else {
      setShowTimePicker(false);
      setShowDatePicker(true);
    }
  };

  const openWebTimePicker = () => {
    if (Platform.OS === "web" && timeInputRef.current) {
      timeInputRef.current.click();
    } else {
      setShowDatePicker(false);
      setShowTimePicker(true);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      const newDate = new Date(date);
      newDate.setFullYear(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      );
      setDate(newDate);
    }
  };

  const onTimeChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false);
    }
    if (selectedDate) {
      const newDate = new Date(date);
      newDate.setHours(selectedDate.getHours(), selectedDate.getMinutes());
      setDate(newDate);
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const onSubmit = async (data: FormData) => {
    if (mode === "create") {
      const newTask: Task = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        dueDate: date,
        createdAt: new Date(),
        priority: data.priority,
        completed: false,
      };

      addTask(newTask);
    } else {
      if (initialData) {
        const updatedTask: Task = {
          ...initialData,
          title: data.title,
          description: data.description,
          dueDate: date,
          priority: data.priority,
        };
        updateTask(updatedTask);
      }
    }

    handleBack();
  };

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="flex-col flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center px-4 py-3 bg-background-light dark:bg-background-dark">
          <TouchableOpacity
            onPress={handleBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <MaterialIcons
              name="arrow-back-ios-new"
              size={24}
              className="text-gray-900 dark:text-white"
            />
          </TouchableOpacity>
          <Text className="flex-1 pr-8 text-lg font-bold tracking-tight text-center text-gray-900 dark:text-white">
            {mode === "create" ? "Create Task" : "Edit Task"}
          </Text>
        </View>

        <ScrollView
          className="flex-1 px-5 py-2"
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <View className="pt-4 mb-6">
            <View className="flex-row justify-between items-end mb-3">
              <Text className="text-xs font-bold tracking-wider text-green-700 uppercase dark:text-green-500">
                Task Title
              </Text>
              <Text
                className={`text-xs font-medium transition-colors ${
                  titleValue?.length >= 50 ? "text-red-500" : "text-gray-500"
                }`}
              >
                {titleValue?.length || 0}/50
              </Text>
            </View>
            <Controller
              control={control}
              rules={{ required: true, maxLength: 50 }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="What needs to be done?"
                  placeholderTextColor="#9CA3AF"
                  maxLength={50}
                  className={`w-full rounded-2xl border bg-white dark:bg-card-dark px-4 py-4 text-base text-gray-900 dark:text-white shadow-sm ${
                    errors.title
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-primary"
                  }`}
                />
              )}
              name="title"
            />
            {errors.title && (
              <Text className="mt-1 text-xs text-red-500">
                Title is required
              </Text>
            )}
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="mb-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
              Description
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  placeholder="Add details about this task..."
                  placeholderTextColor="#9CA3AF"
                  className="px-4 py-4 w-full h-32 text-base text-gray-900 bg-white rounded-2xl border border-gray-200 shadow-sm dark:border-gray-700 dark:bg-card-dark dark:text-white focus:border-primary"
                />
              )}
              name="description"
            />
          </View>

          {/* Deadline */}
          <View className="mb-6">
            <Text className="mb-3 text-xs font-bold tracking-wider text-green-700 uppercase opacity-80 dark:text-green-500">
              Deadline
            </Text>
            <View className="flex-row gap-4">
              {/* Date Picker Trigger */}
              <TouchableOpacity
                onPress={openWebDatePicker}
                className="relative flex-1 group"
              >
                <View className="flex absolute inset-y-0 left-0 z-10 justify-center items-center pl-4 pointer-events-none">
                  <MaterialIcons
                    name="calendar-today"
                    size={20}
                    color="#6B7280"
                  />
                </View>
                <TextInput
                  editable={false}
                  value={formatDate(date)}
                  className="py-4 pr-4 pl-11 w-full text-base text-gray-900 bg-white rounded-2xl border border-gray-200 shadow-sm dark:border-gray-700 dark:bg-card-dark dark:text-white"
                />
                {/* Hidden web date input */}
                {Platform.OS === "web" && (
                  <input
                    ref={dateInputRef}
                    type="date"
                    value={date.toISOString().split("T")[0]}
                    onChange={handleWebDateChange}
                    className="absolute w-0 h-0 opacity-0"
                    style={{ position: "absolute", left: -9999 }}
                  />
                )}
              </TouchableOpacity>

              {/* Time Picker Trigger */}
              <TouchableOpacity
                onPress={openWebTimePicker}
                className="relative flex-1 group"
              >
                <View className="flex absolute inset-y-0 left-0 z-10 justify-center items-center pl-4 pointer-events-none">
                  <MaterialIcons name="schedule" size={20} color="#6B7280" />
                </View>
                <TextInput
                  editable={false}
                  value={formatTime(date)}
                  className="py-4 pr-4 pl-11 w-full text-base text-gray-900 bg-white rounded-2xl border border-gray-200 shadow-sm dark:border-gray-700 dark:bg-card-dark dark:text-white"
                />
                {/* Hidden web time input */}
                {Platform.OS === "web" && (
                  <input
                    ref={timeInputRef}
                    type="time"
                    value={date.toTimeString().slice(0, 5)}
                    onChange={handleWebTimeChange}
                    className="absolute w-0 h-0 opacity-0"
                    style={{ position: "absolute", left: -9999 }}
                  />
                )}
              </TouchableOpacity>
            </View>
            {showDatePicker && Platform.OS !== "web" && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onDateChange}
              />
            )}
            {showTimePicker && Platform.OS !== "web" && (
              <DateTimePicker
                value={date}
                mode="time"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                is24Hour={true}
                onChange={onTimeChange}
              />
            )}
          </View>

          {/* Priority */}
          <View className="mb-20">
            <Text className="mb-3 text-xs font-bold tracking-wider text-green-700 uppercase opacity-80 dark:text-green-500">
              Select Priority
            </Text>
            <Controller
              control={control}
              name="priority"
              render={({ field: { onChange, value } }) => (
                <View className="flex-row gap-3">
                  {["low", "medium", "high"].map((p) => (
                    <TouchableOpacity
                      key={p}
                      onPress={() => onChange(p)}
                      className={`flex-1 items-center justify-center py-3 rounded-2xl border ${
                        value === p
                          ? p === "high"
                            ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                            : p === "medium"
                              ? "bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800"
                              : "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                          : "bg-white border-gray-200 dark:bg-card-dark dark:border-gray-700"
                      }`}
                    >
                      <Text
                        className={`text-sm font-bold capitalize ${
                          value === p
                            ? p === "high"
                              ? "text-red-700 dark:text-red-400"
                              : p === "medium"
                                ? "text-orange-700 dark:text-orange-400"
                                : "text-green-700 dark:text-green-400"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {p}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            />
          </View>
        </ScrollView>

        <View className="p-5 pb-8 bg-background-light dark:bg-background-dark">
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.9}
            className="justify-center items-center w-full h-16 rounded-2xl shadow-xl bg-primary shadow-primary/30"
          >
            <Text className="text-[#111812] font-bold text-lg tracking-wide">
              {mode === "create" ? "Save Task" : "Update Task"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
