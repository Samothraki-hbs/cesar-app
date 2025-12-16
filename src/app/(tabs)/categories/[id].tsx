import categories from "@assets/data";
import Button from "@components/Button";
import { defaultChoiceImage } from "@components/PossibleChoiceItem";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
const UniqueChoice = () => {
  const { id } = useLocalSearchParams();
  const category = categories.find((cat) => cat.id.toString() === id); // Je récupère la catégorie qui est passée dans mes paramtères
  const [selectedTalent, setSelectedTalent] = useState<string | number | null>(
    null
  );

  const talentSelectionne = () => {
    console.warn("Vous avez séléctionné le talent !", selectedTalent);
  };
  if (!category) {
    return <Text>La catégorie n'existe pas !</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text>UniqueChoice for {category.title}</Text>
      {category.choices.map((choice) => (
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
            <Text style={styles.film}>{choice.film}</Text>
          </View>

          <Text style={styles.cote}>{choice.cote}</Text>
        </Pressable>
      ))}

      <Button onPress={talentSelectionne} text="Valider la séléction" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
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
    width: 64,
    height: 64,
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
