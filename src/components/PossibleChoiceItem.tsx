import { Href, Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Tables } from "../types";

type TalentData = {
  name: string;
  film_title: string;
  image: string | null;
};

type PossibleCategoryProps = {
  category: Tables<"categories">;
  talent: TalentData | null;
  href?: Href;
};

// nettoyer ce composant pour qu'il soit moins intelligent
const PossibleCategory = ({
  category,
  talent,
  href,
}: PossibleCategoryProps) => {
  const content = (
    <Pressable style={styles.mainContainer}>
      {/* Header : Titre de la catégorie et Points */}
      <View style={styles.headerRow}>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <Text style={styles.pointsText}>{category.points}</Text>
      </View>

      {talent ? (
        /* DESIGN SI SÉLECTIONNÉ (Inspiré de ton image) */
        <View style={styles.selectedTalentContainer}>
          <Image
            source={{ uri: talent.image || "https://via.placeholder.com/50" }}
            style={styles.talentImage}
          />
          <View style={styles.talentInfo}>
            <Text style={styles.talentNameText}>{talent.name}</Text>
            <Text style={styles.filmTitleText}>{talent.film_title}</Text>
          </View>
        </View>
      ) : (
        /* DESIGN PAR DÉFAUT (Vide) */
        <View style={styles.actionBadge}>
          <Text style={styles.actionText}>Choisissez un talent !</Text>
        </View>
      )}
    </Pressable>
  );
  // cette écriture permet de passer href comme un argument conditionnel, et donc de ne pas l'utiliser quand j'ai besoin de mon composant dans la page du profil de l'ami
  if (href) {
    return (
      <Link href={href} asChild>
        {content}
      </Link>
    );
  }
  return content;
};

export default PossibleCategory;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  pointsText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  // Nouveau style pour le talent sélectionné
  selectedTalentContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 10,
  },
  talentImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#EEE",
  },
  talentInfo: {
    marginLeft: 12,
    flex: 1,
  },
  talentNameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  filmTitleText: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  // Style par défaut
  actionBadge: {
    backgroundColor: "#F0F4F8",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#D1D9E0",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
  },
});
