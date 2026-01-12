// à réecrire !!!

import { useOtherProfile } from "@/api/profiles";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
export default function ComponentName() {
  const { id } = useLocalSearchParams();
  const { data: profile, isLoading, error } = useOtherProfile(id);
  if (isLoading) return <ActivityIndicator size="large" />;

  if (error || !profile) {
    return <Text>Erreur : {error?.message || "Non trouvé"}</Text>;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {profile.username}
      </Text>
      <Text>{profile.bio}</Text>
    </View>
  );
}
