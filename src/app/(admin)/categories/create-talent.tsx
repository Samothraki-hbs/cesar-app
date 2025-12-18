import Button from "@components/Button";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const CreateTalentScreen = () => {
  const [name, setName] = useState("");
  const [film, setFilm] = useState("");
  const [cote, setCote] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState("");
  const { id } = useLocalSearchParams();
  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Le nom du talent est obligatoire");
      return false;
    }
    if (!cote) {
      setErrors("Veuillez préciser une cote de départ");
      return false;
    }
    if (!film) {
      setErrors("Veuillez préciser un film");
      return false;
    }
    if (isNaN(parseFloat(cote))) {
      setErrors("La cote doit être un nombre");
      return false;
    }
    return true;
  };
  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.warn(
      "Le talent",
      name,
      "a été créé, pour le film",
      film,
      "avec une cote de",
      cote
    );
  };

  return (
    <View style={styles.container}>
      <Text>Page de création des talents pour la catégorie </Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Titre de la catégorie"
        style={styles.input}
      />

      <Text style={{ color: "red" }}>{errors}</Text>
      <Button onPress={onCreate} text="create" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },

  input: {
    fontWeight: "500",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default CreateTalentScreen;
