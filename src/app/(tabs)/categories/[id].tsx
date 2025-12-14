import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
const UniqueChoice = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <Text>UniqueChoice for {id}</Text>
    </View>
  );
};

export default UniqueChoice;
