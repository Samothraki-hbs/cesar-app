import categories from "@assets/data";
import Category from "@components/PossibleChoiceItem";
import { FlatList } from "react-native";

export default function MenuScreen() {
  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => <Category category={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
