import Colors from "@/constants/Colors";
import categories from "@assets/data";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Pressable } from "react-native";

export default function IdStack() {
  // J'ai passé un id dans la route de mon application, que je retrouve avec useLocalSearchParams
  const { id } = useLocalSearchParams<{ id: string }>();
  // je récupère la catégorie qui correspond à mon id
  const category = categories.find((c) => c.id === (id as string));
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        // je passe ici les options de mon screen
        options={{
          title: category ? category.title : "Categorie",
          // pour que mon "pressable" suive un "link", j'entoure le "pressable" autour du "link" et je vais passer au "link" la propriété "asChild"
          headerRight: () => (
            <Link
              href={{
                pathname: "/(user)/categories/[id]",
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
    </Stack>
  );
}
