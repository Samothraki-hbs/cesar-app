import { Image, StyleSheet, Text, View } from "react-native";
import revelmasculine from "../../../assets/data/revelmasculine";

const revelhomme = revelmasculine[0];

export default function TabOneScreen() {
  return (
    <View>
      <Text style={styles.title}>{revelhomme.name}</Text>
      <Image style={styles.image} source={{ uri: revelhomme.image }} />
      <Text style={styles.title}>Cote: {revelhomme.cote}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
