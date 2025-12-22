import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// penser plus tard à Nest le navigator !!!!

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function LiguesListNavigator() {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
      <TopTabs>
        <TopTabs.Screen name="index" options={{ title: "Classement global" }} />
        <TopTabs.Screen name="ligues-perso" options={{ title: "Mes ligues" }} />
      </TopTabs>
    </SafeAreaView>
  );
}
