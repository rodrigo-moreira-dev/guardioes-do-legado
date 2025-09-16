// app/(tabs)/challenges.tsx
import { StyleSheet, Text, View } from "react-native";

export default function ChallengesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desafios</Text>
      <Text style={styles.description}>
        Aqui você encontrará todos os desafios disponíveis para testar seus
        conhecimentos!
      </Text>
      {/* Adicione o conteúdo dos desafios aqui */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
});
