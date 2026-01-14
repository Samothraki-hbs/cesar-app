// à réecrire !!!
import { useOtherProfile } from "@/api/profiles";
import { useChoicesOtherProfile } from "@/api/user-choices";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
export default function ProfilAmi() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useOtherProfile(id);

  const {
    data: userChoices,
    isLoading: isUserChoicesLoading,
    error: userChoicesError,
  } = useChoicesOtherProfile(id);

  if (isProfileLoading || isUserChoicesLoading) {
    return <ActivityIndicator />;
  }
  if (profileError || !profile) {
    return (
      <View>
        <Text>Erreur dans le profil</Text>
      </View>
    );
  }

  // ne pas oublier de bouger la logique des choix à l'intérieur !!!!
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Les choix de " + profile?.full_name }} />
      <Text>Bonjour tout le monde coucou !</Text>
      <Text>{profile?.full_name}</Text>
      <View>
        {userChoicesError || !userChoices ? (
          <Text>
            L'utilisateur n'a pas encore fait de choix ou une erreur est
            survenue
          </Text>
        ) : (
          <View>
            <Text>Affichage des choix</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
