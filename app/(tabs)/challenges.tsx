// app/(tabs)/challenges.tsx
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
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

  // Adicionando logs para depuração
  console.log("ChallengesScreen - challenges:", challenges);
  console.log("ChallengesScreen - loading:", loading);

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
    console.log(`Clicou no desafio ${challenge.id}`);
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

    console.log("Desafio selecionado:", challenge);
    console.log("Opções de resposta:", challenge.answerOptions);

    setSelectedChallenge(challenge);
    setModalVisible(true);
  };

  const handleAnswer = async (selectedAnswer: number) => {
    if (!selectedChallenge) return;

    console.log(
      `Resposta selecionada: ${selectedAnswer} para o desafio ${selectedChallenge.id}`
    );
    const isCorrect = checkAnswer(selectedChallenge.id, selectedAnswer);
    console.log(`Resposta correta? ${isCorrect}`);

    if (isCorrect) {
      console.log(`Completando desafio ${selectedChallenge.id}`);
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
                challenge.unlocked &&
                  !challenge.completed &&
                  styles.unlockedCard,
              ]}
              onPress={() => handleChallengePress(challenge)}
              disabled={!challenge.unlocked}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.challengeTitle,
                  challenge.completed && styles.completedText,
                  !challenge.unlocked && styles.lockedText,
                  challenge.unlocked &&
                    !challenge.completed &&
                    styles.unlockedText,
                ]}
              >
                {challenge.title}
              </Text>
              <Text
                style={[
                  styles.challengeDescription,
                  challenge.completed && styles.completedText,
                  !challenge.unlocked && styles.lockedText,
                ]}
              >
                {challenge.description}
              </Text>
              <Text
                style={[
                  styles.challengeStatus,
                  challenge.completed && styles.completedStatus,
                  !challenge.unlocked && styles.lockedStatus,
                  challenge.unlocked &&
                    !challenge.completed &&
                    styles.unlockedStatus,
                ]}
              >
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
    backgroundColor: "#f1f1f1ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#620cb8ff",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#6b6b6bff",
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
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    // Efeito 3D base para cartões bloqueados
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  unlockedCard: {
    backgroundColor: "#6B46C1", // Roxo para desafios desbloqueados
    // Efeito 3D para desafios desbloqueados
    borderWidth: 1,
    borderColor: "#4a0a8a",
    borderBottomWidth: 4,
    borderRightWidth: 3,
    borderTopColor: "#8B5FDC",
    borderLeftColor: "#8B5FDC",
  },
  completedCard: {
    backgroundColor: "#68D391", // Verde para desafios concluídos
    // Efeito 3D para desafios concluídos
    borderWidth: 1,
    borderColor: "#48BB78",
    borderBottomWidth: 4,
    borderRightWidth: 3,
    borderTopColor: "#9AE6B4",
    borderLeftColor: "#9AE6B4",
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
  unlockedText: {
    color: "white", // Texto branco para contraste com fundo roxo
  },
  completedText: {
    color: "#2d3748", // Texto escuro para contraste com fundo verde
  },
  lockedText: {
    color: "#666",
  },
  challengeDescription: {
    fontSize: 14,
    color: "white",
    marginBottom: 8,
  },
  challengeStatus: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  unlockedStatus: {
    color: "rgba(255,255,255,0.9)", // Texto semi-transparente branco
  },
  completedStatus: {
    color: "#2d3748", // Texto escuro
  },
  lockedStatus: {
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
    // Efeito 3D para o modal
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderBottomWidth: 4,
    borderRightWidth: 3,
    borderTopColor: "#f8f8f8",
    borderLeftColor: "#f8f8f8",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#620cb8ff",
  },
  questionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  optionButton: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    // Efeito 3D para botões de opção
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderBottomWidth: 6,
    borderRightWidth: 3,
    borderTopColor: "#f8f8f8",
    borderLeftColor: "#f8f8f8",
  },
  optionText: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
  closeButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#6B46C1",
    borderRadius: 8,
    // Efeito 3D para botão fechar
    borderWidth: 1,
    borderColor: "#4a0a8a",
    borderBottomWidth: 6,
    borderRightWidth: 3,
    borderTopColor: "#8B5FDC",
    borderLeftColor: "#8B5FDC",
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
