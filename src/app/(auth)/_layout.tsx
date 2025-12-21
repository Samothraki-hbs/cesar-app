import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{ title: "Se connecter", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="sign-up"
        options={{ title: "S'inscrire", headerTitleAlign: "center" }}
      />
    </Stack>
  );
}
