import React from "react";
import { Image, Text, View } from "react-native";

export function Header() {
  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <View className="flex-row justify-between items-end mb-6">
      <View>
        <Text className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wide leading-normal">
          {dateString}
        </Text>
        <Text className="text-gray-900 dark:text-white tracking-tight text-[32px] font-extrabold leading-tight mt-1">
          My Tasks
        </Text>
      </View>
      <View className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-white dark:border-gray-600 shadow-sm">
        <Image
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKzuvWh-GvupCp4t7cbTEWK15c_lKQSfEhbgNEoDu0c5yRUJ7kP6l9Dgj7oEUE1dXig9uHx_ZaONZ-wKvw4Rm4-pQaECsI898nmqNjj-MxnShY341WFqY6z-moCV7R4h3O3O51lBhG0oUbkNBEKeu0JTLQtF6zaTLywZRZeRjRu463a2TENYEpCPBiBPWxj42qlbsoe-T1fpzV1HMPRyCfCHvYV4cv-qcscww3brCjMchNzLP1D00z4HgyIsRNPepUQipK6ArIANI",
          }}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>
    </View>
  );
}
