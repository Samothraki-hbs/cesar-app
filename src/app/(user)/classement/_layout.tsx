import { Stack } from "expo-router";

// penser plus tard à Nest le navigator !!!!

export default function ClassementNavigator() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
