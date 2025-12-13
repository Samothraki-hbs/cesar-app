import revelmasculine from "@assets/data/revelmasculine";
import PossibleChoice from "@components/PossibleChoice";
import { StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";

export default function MenuScreen() {
  return (
    <View>
      <PossibleChoice choice={revelmasculine[0]} />
      <PossibleChoice choice={revelmasculine[1]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
    marginTop: "auto",
  },
});
