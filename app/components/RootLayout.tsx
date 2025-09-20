// components/RootLayout.tsx (otimizado para ambas plataformas)
import { Slot } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import BottomNavigation from "./BottomNavigation";
import CustomHeader from "./CustomHeader";

function LayoutContent() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <CustomHeader />

      <View
        style={[
          styles.content,
          Platform.OS === "ios" ? { marginBottom: insets.bottom } : {},
        ]}
      >
        <Slot />
      </View>

      {/* No iOS, a BottomNavigation fica acima da área segura */}
      <View
        style={Platform.OS === "android" ? { marginBottom: insets.bottom } : {}}
      >
        <BottomNavigation />
      </View>
    </View>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "left", "right"]} // Não inclui 'bottom' para controlar manualmente
    >
      <LayoutContent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
  },
});
