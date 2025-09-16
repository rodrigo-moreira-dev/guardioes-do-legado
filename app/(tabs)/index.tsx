// app/(tabs)/index.tsx
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavigation from "../components/BottomNavigation";

export default function HomeScreen() {
  const router = useRouter();

  const menuItems = [
    { id: 1, title: "Desafios", icon: "📜", route: "/(tabs)/challenges" },
    { id: 2, title: "Histórias", icon: "📖", route: "/(tabs)/stories" },
    { id: 3, title: "Missões", icon: "🎯", route: "/(tabs)/missions" },
    { id: 4, title: "Biblioteca", icon: "🏆", route: "/(tabs)/library" },
    { id: 5, title: "Conquistas", icon: "🆘", route: "/(tabs)/achievements" },
    { id: 6, title: "SOS", icon: "ℹ️", route: "/(tabs)/sos" },
  ];

  const navigateTo = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.gridItem}
              onPress={() => navigateTo(item.route)}
            >
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomNavigation />
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
