import { useCategoryList } from "@/api/categories";
import { useUserChoices } from "@/api/user-choices";
import PossibleCategory from "@components/PossibleChoiceItem";
import type { Href } from "expo-router";
import { Stack, useSegments } from "expo-router";
import { useMemo } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function MenuScreen() {
  const {
    data: categories,
    isLoading: catLoading,
    error: catError,
  } = useCategoryList();
  const { data: userChoices, isLoading: choicesLoading } = useUserChoices();

  const segments = useSegments();
  const rootSegment = segments[0] || "";

  // optimisation : on transforme l'array en map pour un acccès instantané
  // cela évite de faire un .find() à chaque ligne de la Flatlist

  const choicesMap = useMemo(() => {
    const map = new Map();
    userChoices?.forEach((uc) => {
      if (uc.category_id) map.set(uc.category_id, uc.choices);
    });
    return map;
  }, [userChoices]);

  if (catLoading || choicesLoading)
    return <ActivityIndicator style={{ flex: 1 }} />;
  if (catError) return <Text>Erreur de chargement des catégories</Text>;

  return (
    // je définis ici le headershown sur l'enfant
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: true, title: "Catégories" }} />
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => {
          // 1. On récupère le talent correspondant
          const talent = choicesMap.get(item.id) || null;

          // 2. On construit le chemin et on le caste en Href pour TypeScript
          const path = `/${rootSegment}/categories/${item.id}` as Href;

          return (
            <PossibleCategory category={item} talent={talent} href={path} />
          );
        }}
      />
    </View>
  );
}
