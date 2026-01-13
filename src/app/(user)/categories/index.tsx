import { useCategoryList } from "@/api/categories";
import PossibleCategory from "@components/PossibleChoiceItem";
import { Stack } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function MenuScreen() {
  const { data: categories, error, isLoading } = useCategoryList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch categories</Text>;
  }

  return (
    // je définis ici le headershown sur l'enfant
    <View>
      <Stack.Screen options={{ headerShown: true, title: "Catégories" }} />
      <FlatList
        data={categories}
        renderItem={({ item }) => <PossibleCategory category={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
}
