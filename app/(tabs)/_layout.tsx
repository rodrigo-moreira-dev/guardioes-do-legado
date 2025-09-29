// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" }, // Esconde a tab bar nativa
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="challenges" />
      <Tabs.Screen name="stories" />
      <Tabs.Screen name="missions" />
      <Tabs.Screen name="library" />
      <Tabs.Screen name="sos" />
    </Tabs>
  );
}
