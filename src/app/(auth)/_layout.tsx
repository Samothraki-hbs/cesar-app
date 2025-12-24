import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={"/"} />;
  }
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
