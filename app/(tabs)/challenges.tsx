// app/(tabs)/challenges.tsx
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useChallenges } from "../hooks/useChallenges";
import { Challenge } from "../types/challenges.type";

export default function ChallengesScreen() {
  const { challenges, loading, toggleChallenge, unlockNextChallenge } =
    useChallenges();

  const handleChallengePress = async (challenge: any) => {
    if (!challenge.unlocked) {
      Alert.alert(
        "Desafio Bloqueado",
        "Complete os desafios anteriores para desbloquear este."
      );
      return;
    }

    if (!challenge.completed) {
      Alert.alert(
        "Completar Desafio",
        `Deseja marcar "${challenge.title}" como concluído?`,
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Confirmar",
            onPress: async () => {
              await toggleChallenge(challenge.id);
              // Desbloquear próximo desafio após completar
              unlockNextChallenge();
              Alert.alert("Parabéns!", "Desafio concluído com sucesso!");
            },
          },
        ]
      );
    } else {
      Alert.alert(
        "Desmarcar Desafio",
        `Deseja marcar "${challenge.title}" como não concluído?`,
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Confirmar",
            onPress: async () => {
              await toggleChallenge(challenge.id);
              Alert.alert(
                "Desafio reaberto",
                "Agora você pode tentar novamente."
              );
            },
          },
        ]
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Desafios</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text>Carregando seus desafios...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desafios</Text>
      <Text style={styles.subtitle}>
        {challenges.filter((c: Challenge) => c.completed).length} de{" "}
        {challenges.length} concluídos
      </Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {challenges.map((challenge: Challenge) => (
          <TouchableOpacity
            key={challenge.id}
            style={[
              styles.challengeCard,
              challenge.completed && styles.completedCard,
              !challenge.unlocked && styles.lockedCard,
            ]}
            onPress={() => handleChallengePress(challenge)}
            disabled={!challenge.unlocked}
            activeOpacity={0.7}
          >
            <Text style={styles.challengeTitle}>{challenge.title}</Text>
            <Text style={styles.challengeDescription}>
              {challenge.description}
            </Text>
            <Text style={styles.challengeStatus}>
              {challenge.completed
                ? "✅ Concluído"
                : challenge.unlocked
                ? "🟡 Disponível"
                : "🔒 Bloqueado"}
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
    textAlign: "center",
    marginVertical: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  challengeCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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
  lockedCard: {
    backgroundColor: "#f5f5f5",
    opacity: 0.6,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  challengeDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  challengeStatus: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
});
