import { useCategory } from "@/api/categories";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function IdStack() {
  // J'ai passé un id dans la route de mon application, que je retrouve avec useLocalSearchParams
  const { id } = useLocalSearchParams<{ id: string }>();
  // je récupère la catégorie qui correspond à mon id
  const { data: category, error, isLoading } = useCategory(id);
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !category) {
    return error;
  }

  // pourquoi est-ce que je ne parviens pas à trouver la catégorie ???
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        // je passe ici les options de mon screen
        options={{
          title: category ? category.title : "Categorie coucou",
          // pour que mon "pressable" suive un "link", j'entoure le "pressable" autour du "link" et je vais passer au "link" la propriété "asChild"
          headerRight: () => (
            <Link
              href={{
                pathname: "/(user)/categories/[id]",
                params: { id },
              }}
              asChild
            ></Link>
          ),
        }}
      />
    </Stack>
  );
}
