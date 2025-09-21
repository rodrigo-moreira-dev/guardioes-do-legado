// app/(tabs)/challenges.tsx
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useProgress } from "../hooks/useProgress";
import { Challenge } from "../types/challenges.type";

export default function ChallengesScreen() {
  const { challenges, loading, completeChallenge, checkAnswer } = useProgress();
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

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

  if (!challenges || !Array.isArray(challenges)) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Desafios</Text>
        <View style={styles.errorContainer}>
          <Text>Erro ao carregar desafios. Tente novamente.</Text>
        </View>
      </View>
    );
  }

  const handleChallengePress = (challenge: Challenge) => {
    if (!challenge.unlocked) {
      Alert.alert(
        "Desafio Bloqueado",
        "Complete os desafios anteriores para desbloquear este."
      );
      return;
    }

    if (challenge.completed) {
      Alert.alert("Desafio Concluído", "Você já completou este desafio!");
      return;
    }

    setSelectedChallenge(challenge);
    setModalVisible(true);
  };

  const handleAnswer = async (selectedAnswer: number) => {
    if (!selectedChallenge) return;

    const isCorrect = checkAnswer(selectedChallenge.id, selectedAnswer);

    if (isCorrect) {
      await completeChallenge(selectedChallenge.id, true);
      Alert.alert("Parabéns!", "Resposta correta! História desbloqueada.");
    } else {
      Alert.alert("Tente Novamente", "Resposta incorreta. Tente novamente!");
    }

    setModalVisible(false);
  };

  const completedCount = challenges.filter((c) => c.completed).length;
  const totalCount = challenges.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desafios</Text>
      <Text style={styles.subtitle}>
        {completedCount} de {totalCount} concluídos
      </Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {challenges.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum desafio disponível</Text>
        ) : (
          challenges.map((challenge) => (
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
          ))
        )}
      </ScrollView>

      {/* Modal do Quiz */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedChallenge && (
              <>
                <Text style={styles.modalTitle}>{selectedChallenge.title}</Text>
                <Text style={styles.questionText}>
                  {selectedChallenge.questionText}
                </Text>

                {selectedChallenge.answerOptions &&
                  selectedChallenge.answerOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.optionButton}
                      onPress={() => handleAnswer(index)}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 50,
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
      web: { boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" },
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
