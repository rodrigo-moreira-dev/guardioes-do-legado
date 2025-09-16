// components/CustomHeader.tsx
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, usePathname } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CustomHeaderProps {
  canGoBack: boolean;
}

export default function CustomHeader({ canGoBack }: CustomHeaderProps) {
  const navigation = useNavigation();
  const pathname = usePathname();

  // Não mostrar header na tela inicial
  if (pathname === "/") {
    return null;
  }

  const getHeaderTitle = () => {
    switch (pathname) {
      case "/challenges":
        return "Desafios";
      case "/stories":
        return "Histórias";
      case "/missions":
        return "Missões";
      case "/library":
        return "Biblioteca";
      case "/achievements":
        return "Conquistas";
      case "/sos":
        return "SOS";
      default:
        return "Voltar";
    }
  };

  return (
    <View style={styles.header}>
      {canGoBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#007AFF" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.title}>{getHeaderTitle()}</Text>

      {/* Espaço vazio para alinhamento */}
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    height: 60,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  backText: {
    color: "#007AFF",
    marginLeft: 8,
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    flex: 1,
  },
  placeholder: {
    width: 80, // Largura do botão de voltar para manter alinhamento
  },
});
