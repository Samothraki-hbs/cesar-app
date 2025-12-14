import revelmasculine from "@assets/data/revelmasculine";
import PossibleChoice from "@components/PossibleChoiceItem";
import { FlatList } from "react-native";

export default function MenuScreen() {
  return (
    <FlatList
      data={revelmasculine}
      renderItem={({ item }) => <PossibleChoice choice={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
