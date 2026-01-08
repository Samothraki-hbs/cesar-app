import { useCategoryList } from "@/api/categories";
import PossibleCategory from "@components/PossibleChoiceItem";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function MenuScreen() {
  const { data: categories, error, isLoading } = useCategoryList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch categories</Text>;
  }

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => <PossibleCategory category={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
