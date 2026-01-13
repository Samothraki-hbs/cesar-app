import { Stack } from "expo-router";

export default function CategoriesStack() {
  return (
    // Simple Stack, avec une animation "slide_from_bottom", utile pour Android
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
