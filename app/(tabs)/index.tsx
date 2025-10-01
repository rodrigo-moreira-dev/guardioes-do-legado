// app/(tabs)/index.tsx
import { useNavigation } from "expo-router";
import {
  Image,
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
      route: "challenges", // Apenas o nome da rota
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo, Guardião</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.gridItem}
              onPress={() => navigateTo(item.route)}
              activeOpacity={0.7}
            >
              {/* Usando Image component para as imagens */}
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
    // Sombra compatível
    ...Platform.select({
      web: {
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
    }),
  },
  image: {
    width: 60, // Tamanho da imagem
    height: 60,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});
