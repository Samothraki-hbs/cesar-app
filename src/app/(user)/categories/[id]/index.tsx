// page de séléction des choix pour chaque catégorie
import { useChoices } from "@/api/choices";
import Button from "@components/Button";
import { defaultChoiceImage } from "@components/PossibleChoiceItem";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
const UniqueChoice = () => {
  // je récupère l'id que j'ai passé dans ma route avec le hook "useLocalSearchParams"
  const { id } = useLocalSearchParams();
  // j'utilise categoryId en transformant mon "id " en number
  const categoryId = Number(id);
  // j'utilise le custom hook useChoices qui passe en paramètre "categoryId", et j'extrais de ce hook les props data, error et isLoading
  // toujours extraire isLoading et error pour gérer les états du hook
  const { data: choices, error, isLoading } = useChoices(categoryId);
  // j'utilise un useState pour séléctionner le talent, et je précise que la donnée doit être de type string, number ou null
  const [selectedTalent, setSelectedTalent] = useState<string | number | null>(
    null
  );

  const talentSelectionne = () => {
    console.warn("Le choix", selectedTalent, "a remporté un César !");
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch categories</Text>;
  }
  return (
    // je créé une map de mes choix pour tous les afficher à la page
    <View style={styles.container}>
      <Text style={styles.title}>Catégorie {categoryId}</Text>
      {(choices ?? []).map((choice) => (
        <Pressable
          key={String(choice.id)}
          style={[
            styles.row,
            {
              backgroundColor:
                selectedTalent === choice.id ? "gainsboro" : "white",
            },
          ]}
          onPress={() => setSelectedTalent(choice.id)}
        >
          <Image
            source={{ uri: choice.image || defaultChoiceImage }}
            style={styles.image}
          />
          <View style={styles.middle}>
            <Text style={styles.title}>{choice.name}</Text>
            <Text style={styles.film}>{choice.film_title}</Text>
          </View>

          <Text style={styles.cote}>{choice.points}</Text>
        </Pressable>
      ))}

      <Button onPress={talentSelectionne} text="Valider le gagnant" />
      {/* à modifier plus tard pour avoir un bouton qui séléctionne le gagnant*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F2F7",
    flex: 1,
    padding: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  film: {
    fontSize: 13,
    color: "#666",
  },

  row: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },

  middle: {
    flex: 1,
    justifyContent: "center",
  },

  cote: {
    fontSize: 16,
    fontWeight: "700",
  },
});

export default UniqueChoice;
