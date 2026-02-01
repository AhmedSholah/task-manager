import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function EditTask() {
  const { id } = useLocalSearchParams();
  return (
    <View className="flex-1 justify-center items-center bg-background-light dark:bg-background-dark">
      <Text className="text-gray-900 dark:text-white">
        Edit Task {id} (Stub)
      </Text>
    </View>
  );
}
