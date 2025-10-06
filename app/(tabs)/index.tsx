// app/(tabs)/index.tsx
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const menuItems = [
    {
      id: 1,
      title: "Desafios",
      image: require("../../assets/images/challenges.png"),
      route: "challenges",
    },
    {
      id: 2,
      title: "Histórias",
      image: require("../../assets/images/stories.png"),
      route: "stories",
    },
    {
      id: 3,
      title: "Missões",
      image: require("../../assets/images/missions.png"),
      route: "missions",
    },
    {
      id: 4,
      title: "Biblioteca",
      image: require("../../assets/images/library.png"),
      route: "library",
    },
    {
      id: 5,
      title: "Conquistas",
      image: require("../../assets/images/achievements.png"),
      route: "achievements",
    },
    {
      id: 6,
      title: "SOS",
      image: require("../../assets/images/sos.png"),
      route: "sos",
    },
  ];

  const navigateTo = (route: string) => {
    navigation.navigate(route as any);
  };

  const openInstagram = async () => {
    const instagramUrl = "https://www.instagram.com/guardioes.do.legado";

    try {
      // No navegador, sempre usa a URL web
      if (Platform.OS === "web") {
        window.open(instagramUrl, "_blank");
        return;
      }

      // Para mobile, tenta abrir no app primeiro
      const appUrl = "instagram://user?username=guardioes.do.legado";
      const canOpenApp = await Linking.canOpenURL(appUrl);

      if (canOpenApp) {
        await Linking.openURL(appUrl);
      } else {
        // Fallback para navegador no mobile
        await Linking.openURL(instagramUrl);
      }
    } catch (error) {
      console.error("Erro ao abrir Instagram:", error);

      // Fallback final
      if (Platform.OS === "web") {
        window.open(instagramUrl, "_blank");
      } else {
        await Linking.openURL(instagramUrl);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.gridItem}
              onPress={() => navigateTo(item.route)}
              activeOpacity={0.7}
            >
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}

          {/* Botão do Instagram */}
          <TouchableOpacity
            style={styles.instagramButton}
            onPress={openInstagram}
            activeOpacity={0.7}
          >
            <View style={styles.instagramContent}>
              <FontAwesome5 name="instagram" size={24} color="white" />
              <Text style={styles.instagramText}>Siga-nos no Instagram</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    padding: 15,

    // Efeito 3D
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderBottomWidth: 6,
    borderRightWidth: 4,
    borderTopColor: "#f8f8f8",
    borderLeftColor: "#f8f8f8",
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  instagramButton: {
    width: "100%", // Largura total
    height: 70, // Altura menor que os grid items
    backgroundColor: "#E1306C", // Vermelho/rosa do Instagram
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    padding: 15,

    // Efeito 3D similar aos grid items
    borderWidth: 1,
    borderColor: "#C13584", // Cor mais escura para bordas
    borderBottomWidth: 6,
    borderRightWidth: 4,
    borderTopColor: "#F56040", // Gradiente mais claro
    borderLeftColor: "#F56040",
  },
  instagramContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  instagramText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginLeft: 10,
    textAlign: "center",
  },
});
