import Colors from "@/constants/Colors";
import categories from "@assets/data";
import Button from "@components/Button";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";

const CreateTalentScreen = () => {
  const [name, setName] = useState("");
  const [film, setFilm] = useState("");
  const [cote, setCote] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState("");
  const { id } = useLocalSearchParams();
  const category = categories.find((c) => c.id === (id as string));
  const defaultCesarImage =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fminuteluxe.com%2Fwp-content%2Fuploads%2F2021%2F03%2F21036837.jpg&f=1&nofb=1&ipt=5031c43e22bdfef253be9911b5b7839a37b6c9d0cbb60cffd379c64c81307a99";
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
      cote,
      "pour la catégorie",
      category?.title ?? id
    );
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission tu access the media library is required"
      );
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Ajouter un talent" }} />
      <Image
        source={{ uri: image || defaultCesarImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>
      <Text style={styles.title}>
        Page de création des talents pour la catégorie {category?.title ?? id}
      </Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Titre de la catégorie"
        style={styles.input}
      />
      <TextInput
        value={cote}
        onChangeText={setCote}
        placeholder="Cote du talent"
        style={styles.input}
      />

      <TextInput
        value={film}
        onChangeText={setFilm}
        placeholder="Film du talent"
        style={styles.input}
      />

      <Text style={{ color: "red" }}>{errors}</Text>
      <Button onPress={onCreate} text="Ajouter le talent" />
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

  title: {
    fontWeight: "500",
    fontSize: 18,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },

  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
  },
});

export default CreateTalentScreen;
