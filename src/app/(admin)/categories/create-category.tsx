import Button from "@components/Button";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const CreateCategoryScreen = () => {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState("");
  const validateInput = () => {
    setErrors("");
    if (!title) {
      setErrors("Le titre est obligatoire");
      return false;
    }
    return true;
  };
  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.warn("La catégorie", title, "a été créée !");
  };

  return (
    <View style={styles.container}>
      <Text>Page de création des catégories</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
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

export default CreateCategoryScreen;
