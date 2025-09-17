// app/(tabs)/challenges.tsx
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Interface para o tipo Challenge
interface Challenge {
  id: number;
  title: string;
  completed: boolean;
}

export default function ChallengesScreen() {
  // Estado para gerenciar os desafios
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: 1, title: "Desafio Matemático", completed: true },
    { id: 2, title: "Quebra-cabeça Lógico", completed: false },
    { id: 3, title: "Desafio de Memória", completed: false },
    { id: 4, title: "Teste de Velocidade", completed: true },
    { id: 5, title: "Desafio Criativo", completed: false },
  ]);

  // Função para alternar o estado completed
  const toggleChallenge = (id: number) => {
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) =>
        challenge.id === id
          ? { ...challenge, completed: !challenge.completed }
          : challenge
      )
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {challenges.map((challenge) => (
          <TouchableOpacity
            key={challenge.id}
            style={[
              styles.challengeCard,
              challenge.completed && styles.completedCard,
            ]}
            onPress={() => toggleChallenge(challenge.id)} // Adicione o onPress aqui
            activeOpacity={0.7}
          >
            <Text style={styles.challengeTitle}>{challenge.title}</Text>
            <Text style={styles.challengeStatus}>
              {challenge.completed ? "✅ Concluído" : "🟡 Pendente"}
            </Text>
          </TouchableOpacity>
        ))}
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
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
    marginTop: 10, // Espaço para o header
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80, // Espaço para a bottom navigation
  },
  challengeCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    // Estilos de sombra compatíveis
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
  completedCard: {
    backgroundColor: "#f0f9f0",
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  challengeStatus: {
    fontSize: 14,
    color: "#666",
  },
});
