// components/BottomNavigation.tsx
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, usePathname, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BottomNavigation() {
  const navigation = useNavigation();
  const pathname = usePathname();
  const router = useRouter();

  const navigateTo = (route: string) => {
    router.push(route as any);
  };

  const navItems = [
    { id: "home", label: "Início", icon: "home", route: "/" },
    { id: "stories", label: "Histórias", icon: "book", route: "/stories" },
    {
      id: "library",
      label: "Biblioteca",
      icon: "book-open",
      route: "/library",
    },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const isActive = pathname === item.route;

        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.navItem, isActive && styles.activeNavItem]}
            onPress={() => navigateTo(item.route)}
          >
            <FontAwesome5
              name={item.icon}
              size={20}
              color={isActive ? "#7FBB00" : "#543C75"}
            />
            <Text style={[styles.navLabel, isActive && styles.activeNavLabel]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 70,
  },
  navItem: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  activeNavItem: {
    // Estilo adicional para item ativo se necessário
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#543C75",
  },
  activeNavLabel: {
    color: "#7FBB00",
    fontWeight: "600",
  },
});
