// le layout de (user), avec les trois tabs en bas qui sont les trois catégories de pages
import { useAuth } from "@/providers/AuthProvider";
import { useClientOnlyValue } from "@components/useClientOnlyValue";
import { useColorScheme } from "@components/useColorScheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import Colors from "../../constants/Colors";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();
  if (!session) {
    return <Redirect href={"/"} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen name="index" options={{ href: null, headerShown: false }} />

      <Tabs.Screen
        name="categories"
        options={{
          headerShown: false,
          title: "Catégories",
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
        }}
      />
      <Tabs.Screen
        name="classement"
        options={{
          headerShown: false,
          title: "Classement",
          tabBarIcon: ({ color }) => <TabBarIcon name="circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => <TabBarIcon name="square" color={color} />,
        }}
      />
    </Tabs>
  );
}
