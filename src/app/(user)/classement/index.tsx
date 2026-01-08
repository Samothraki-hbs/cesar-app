import { useClassement } from "@/api/classement";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
// Ajuste le chemin selon ton projet

export default function UserList() {
  const { data: profiles, isLoading, error } = useClassement();

  // 1. Gestion du chargement
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // 2. Gestion des erreurs
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>Erreur : {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.username}>
              {item.username || "Utilisateur sans nom"}
            </Text>
          </View>
        )}
        // Optionnel : Message si la liste est vide
        ListEmptyComponent={<Text>Aucun utilisateur trouvé.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  username: {
    fontSize: 16,
    fontWeight: "500",
  },
});
