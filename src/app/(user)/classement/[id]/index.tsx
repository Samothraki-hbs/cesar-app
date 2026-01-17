// à réecrire !!!
import { useCategoryList } from "@/api/categories";
import { useOtherProfile } from "@/api/profiles";
import { useUserChoices } from "@/api/user-choices";
import PossibleCategory from "@components/PossibleChoiceItem";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
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
    data: categories,
    isLoading: catLoading,
    error: catError,
  } = useCategoryList();

  const {
    data: userChoices,
    isLoading: isUserChoicesLoading,
    error: userChoicesError,
  } = useUserChoices(id);

  const choicesMap = useMemo(() => {
    const map = new Map();
    userChoices?.forEach((uc) => {
      if (uc.category_id) map.set(uc.category_id, uc.choices);
    });
    return map;
  }, [userChoices]);

  // Logique de filtrage des catégories
  // Utilisation de filter et has à préciser
  const filteredCategories = useMemo(() => {
    if (!categories || !userChoices) return [];
    // logique à apprendre, à préciser
    return categories.filter((cat) => choicesMap.has(cat.id));
  }, [categories, choicesMap, userChoices]);

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
        {userChoicesError || !userChoices ? (
          <Text>
            L'utilisateur n'a pas encore fait de choix ou une erreur est
            survenue
          </Text>
        ) : (
          <FlatList
            data={filteredCategories}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            renderItem={({ item }) => {
              const talent = choicesMap.get(item.id) || null;
              return <PossibleCategory category={item} talent={talent} />;
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
