// à réecrire !!!
import { useOtherProfile } from "@/api/profiles";
import { useUserChoices } from "@/api/user-choices";
import PossibleCategory from "@components/PossibleChoiceItem";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
  } = useUserChoices(id);

  // Logique de filtrage des catégories
  // Utilisation de filter et has à préciser

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
      <View>
        {userChoicesError || !userChoices || userChoices.length === 0 ? (
          <Text>
            L'utilisateur n'a pas encore fait de choix ou une erreur est
            survenue
          </Text>
        ) : (
          <FlatList
            data={userChoices}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            renderItem={({ item }) => {
              if (!item.categories || !item.choices) {
                return null;
              }
              return (
                <PossibleCategory
                  category={item.categories}
                  talent={item.choices}
                />
              );
            }}
          />
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
