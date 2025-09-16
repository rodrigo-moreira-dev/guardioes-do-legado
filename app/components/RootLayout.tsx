// components/RootLayout.tsx
import { Slot, useNavigation } from "expo-router";
import { StyleSheet, View } from "react-native";
import BottomNavigation from "./BottomNavigation";
import CustomHeader from "./CustomHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  return (
    <View style={styles.container}>
      {/* Header personalizado */}
      <CustomHeader canGoBack={canGoBack} />

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Slot />
      </View>

      {/* Navegação inferior */}
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    marginBottom: 70, // Altura da BottomNavigation
  },
});
