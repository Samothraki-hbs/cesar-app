import { Href, Link, useSegments } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { Tables } from "../types";

type CategoryProps = {
  category: Tables<"categories">;
};

const PossibleCategory = ({ category }: CategoryProps) => {
  const segments = useSegments();
  const rootSegment = segments[0] || "";
  const path = `/${rootSegment}/categories/${category.id}`;

  return (
    <Link href={path as Href} asChild>
      <Pressable style={styles.container}>
        <Text style={styles.title}>{category.title}</Text>
        <Text style={styles.points}>{category.points}</Text>
      </Pressable>
    </Link>
  );
};

export default PossibleCategory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row", // Aligne le titre et les points horizontalement
    alignItems: "center", // Centre verticalement le texte
    justifyContent: "space-between", // Pousse le titre à gauche et les points à droite
    marginVertical: 5,
    // Optionnel : ajouter une petite ombre pour le relief
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    color: "#333",
  },
  points: {
    fontWeight: "bold", // Met les points en gras
    fontSize: 16,
  },
});
