import { MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900 p-5">
        <MaterialIcons name="error-outline" size={80} color="#EF4444" />
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mt-6 text-center">
          Page Not Found
        </Text>
        <Text className="text-gray-500 mt-3 text-center text-base max-w-xs">
          The page you are looking for doesn't exist or has been moved.
        </Text>

        <Link href="/" asChild>
          <TouchableOpacity className="mt-8 bg-emerald-500 px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/30 active:scale-95">
            <Text className="text-white font-bold text-lg">Go Home</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}
