// à réecrire !!!
import { useOtherProfile } from "@/api/profiles";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
export default function ProfilAmi() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: profile, isLoading, error } = useOtherProfile(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !profile) {
    return (
      <View>
        <Text>Erreur dans le profil</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Les choix de " + profile?.full_name }} />
      <Text>Bonjour tout le monde coucou !</Text>
      <Text>{profile?.full_name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
