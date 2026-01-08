import { StyleSheet } from "react-native";

import { useAuth } from "@/providers/AuthProvider";
import { Text, View } from "@components/Themed";

export default function TabThreeScreen() {
  const { profile } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{profile?.username}</Text>
      <Text>Nombre de points: </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
