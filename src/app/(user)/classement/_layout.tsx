import { Stack } from "expo-router";

// penser plus tard à Nest le navigator !!!!

export default function ClassementNavigator() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="[id]"
        options={{ title: "Détails du profil", headerShown: false }}
      />
    </Stack>
  );
}
