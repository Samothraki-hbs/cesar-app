import categories from "@assets/data";
import PossibleCategory from "@components/PossibleChoiceItem";
import { FlatList } from "react-native";

export default function MenuScreen() {
  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => <PossibleCategory category={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
