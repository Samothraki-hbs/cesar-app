import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";
import { Category, PossibleChoice } from "../types";

export const defaultChoiceImage =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimgr.cineserie.com%2F2017%2F01%2FBO-2001-troph%25C3%25A9e-C%25C3%25A9sar-2.jpg%3Fimgeng%3D%2Ff_jpg%2Fcmpr_0%2Fw_212%2Fh_318%2Fm_cropbox%26ver%3D1&f=1&nofb=1&ipt=8271381b61a6d3a8fcfd0aa524c394a5cd66f3096d92321d467a5fd4e9d78fca";

type CategoryProps = {
  category: Category;
};

type PossibleChoiceProps = {
  choice: PossibleChoice;
};

const PossibleCategory = ({ category }: CategoryProps) => {
  return (
    <Link href={`/categories/${category.id}`} asChild>
      <Pressable style={styles.container}>
        <Text style={styles.title}>{category.title}</Text>
        {/* <Image
          style={styles.image}
          source={{ uri: choice.image || defaultChoiceImage }}
          resizeMode="contain"
        />
        <Text style={styles.title}>Cote: {choice.cote}</Text> */}
      </Pressable>
    </Link>
  );
};

export default PossibleCategory; // Je pourrai ensuite renommer comme je veux ce composant dans mes imports !

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
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
