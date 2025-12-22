import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
export default function ComponentName() {
  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <Text>ComponentName</Text>
    </View>
  );
}
