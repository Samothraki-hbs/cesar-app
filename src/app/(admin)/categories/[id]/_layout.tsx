import Colors from "@/constants/Colors";
import categories from "@assets/data";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Pressable } from "react-native";

export default function IdStack() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const category = categories.find((c) => c.id === (id as string));
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        options={{
          title: category ? category.title : "Categorie",
          headerRight: () => (
            <Link
              href={{
                pathname: "/(admin)/categories/[id]/create-talent",
                params: { id },
              }}
              asChild
            >
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={20}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen name="create-talent" />
    </Stack>
  );
}
