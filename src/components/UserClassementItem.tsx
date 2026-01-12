import { Href, Link, useSegments } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";
import { Tables } from "../types";

export const defaultChoiceImage =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimgr.cineserie.com%2F2017%2F01%2FBO-2001-troph%25C3%25A9e-C%25C3%25A9sar-2.jpg%3Fimgeng%3D%2Ff_jpg%2Fcmpr_0%2Fw_212%2Fh_318%2Fm_cropbox%26ver%3D1&f=1&nofb=1&ipt=8271381b61a6d3a8fcfd0aa524c394a5cd66f3096d92321d467a5fd4e9d78fca";

// type pour les profils que je peux séléctionner depuis le classement
// j'importe les types préconcus depuis la base supabase
type ProfileClassementProps = {
  profile: Tables<"profiles">;
};

type PossibleChoiceProps = {
  choice: Tables<"choices">;
};

// la donnée profile que je passerai sera de type ProfileClassementProps et devra respecter ce contrat de données
const UserClassementItem = ({ profile }: ProfileClassementProps) => {
  const segments = useSegments();
  const rootSegment = segments[0] || "";
  const path = `/${rootSegment}/classement/${profile.id}`;
  return (
    <Link href={path as Href} asChild>
      <Pressable style={styles.container}>
        <Text style={styles.title}>{profile.username}</Text>
      </Pressable>
    </Link>
  );
};

// utilisation de useSegments ?

export default UserClassementItem; // Je pourrai ensuite renommer comme je veux ce composant dans mes imports !

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
