// components/CustomHeader.tsx
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, usePathname, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomHeader() {
  const navigation = useNavigation();
  const pathname = usePathname();
  const router = useRouter();

  const canGoBack = navigation.canGoBack();

  // Não mostrar header na tela inicial
  if (pathname === "/" || pathname === "/(tabs)") {
    return null;
  }

  const navigateTo = (route: string) => {
    router.push(route as any);
  };

  const getHeaderTitle = () => {
    const routeName = pathname.split("/").pop();

    switch (routeName) {
      case "challenges":
        return "Desafios";
      case "stories":
        return "Histórias";
      case "missions":
        return "Missões";
      case "library":
        return "Biblioteca";
      case "achievements":
        return "Conquistas";
      case "sos":
        return "SOS";
      default:
        return routeName || "Voltar";
    }
  };

  return (
    <View style={styles.header}>
      {!canGoBack ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigateTo("/")}
        >
          <FontAwesome5 name="arrow-left" size={16} color="#6B46C1" />
          <Text style={styles.backText} numberOfLines={1}>
            Voltar
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={styles.title} numberOfLines={1}>
        {getHeaderTitle()}
      </Text>

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
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    minHeight: 56, // Altura mínima maior
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    minWidth: 70, // Largura mínima
    maxWidth: 100, // Largura máxima
    // Efeito 3D para botão voltar
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderBottomWidth: 3,
    borderRightWidth: 2,
    borderTopColor: "#f8f8f8",
    borderLeftColor: "#f8f8f8",
    borderRadius: 8,
    backgroundColor: "white",
  },
  backText: {
    color: "#6B46C1",
    marginLeft: 6,
    fontSize: 14, // Fonte menor
    fontWeight: "600",
    flexShrink: 1, // Permite que o texto encolha se necessário
  },
  title: {
    fontSize: 20, // Fonte um pouco menor
    fontWeight: "bold",
    color: "#6B46C1",
    textAlign: "center",
    flex: 1,
    marginHorizontal: 8, // Margem para não colar nas bordas
  },
  placeholder: {
    width: 70, // Largura igual ao botão para balancear
  },
});
