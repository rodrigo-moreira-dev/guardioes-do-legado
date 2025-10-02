import React, { useState } from "react";
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
import { useMissions } from "../hooks/useMissions";
import { Mission } from "../types/missions.type";

export default function MissionsScreen() {
  const { missions, loading, completeMission } = useMissions();
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Missões</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text>Carregando missões...</Text>
        </View>
      </View>
    );
  }

  if (!missions || !Array.isArray(missions)) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Missões</Text>
        <View style={styles.errorContainer}>
          <Text>Erro ao carregar missões. Tente novamente.</Text>
        </View>
      </View>
    );
  }

  const handleMissionPress = (mission: Mission) => {
    if (!mission.unlocked) {
      Alert.alert(
        "Missão Bloqueada",
        "Complete as missões anteriores para desbloquear esta."
      );
      return;
    }

    if (mission.completed) {
      Alert.alert("Missão Concluída", "Você já completou esta missão!");
      return;
    }

    setSelectedMission(mission);
    setModalVisible(true);
  };

  const handleComplete = async () => {
    if (selectedMission) {
      await completeMission(selectedMission.id);
      Alert.alert("Parabéns!", "Missão concluída com sucesso!");
    }
    setModalVisible(false);
  };

  const completedCount = missions.filter((m) => m.completed).length;
  const totalCount = missions.length;

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Molde o futuro da sua comunidade, seja um herói
      </Text>
      {/* Barra de progresso */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Progresso: {completedCount}/{totalCount} missões concluídas
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(completedCount / totalCount) * 100}%` },
            ]}
          />
        </View>
      </View>
      <View style={styles.separator} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {missions.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma missão disponível</Text>
        ) : (
          missions.map((mission) => (
            <TouchableOpacity
              key={mission.id}
              style={[
                styles.missionCard,
                mission.completed && styles.completedCard,
                !mission.unlocked && styles.lockedCard,
                mission.unlocked && !mission.completed && styles.unlockedCard,
              ]}
              onPress={() => handleMissionPress(mission)}
              disabled={!mission.unlocked}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.missionTitle,
                  mission.completed && styles.completedText,
                  !mission.unlocked && styles.lockedText,
                  mission.unlocked && !mission.completed && styles.unlockedText,
                ]}
              >
                {mission.title}
              </Text>
              <Text
                style={[
                  styles.missionDescription,
                  mission.completed && styles.completedText,
                  !mission.unlocked && styles.lockedText,
                ]}
              >
                {mission.description}
              </Text>
              <Text
                style={[
                  styles.missionStatus,
                  mission.completed && styles.completedStatus,
                  !mission.unlocked && styles.lockedStatus,
                  mission.unlocked &&
                    !mission.completed &&
                    styles.unlockedStatus,
                ]}
              >
                {mission.completed
                  ? "✅ Concluída"
                  : mission.unlocked
                  ? "🟡 Disponível"
                  : "🔒 Bloqueada"}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedMission && (
              <>
                <Text style={styles.modalTitle}>{selectedMission.title}</Text>
                <Text style={styles.missionText}>
                  {selectedMission.description}
                </Text>

                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={handleComplete}
                >
                  <Text style={styles.completeButtonText}>
                    Completar Missão
                  </Text>
                </TouchableOpacity>

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
    marginRight: 20,
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#620cb8ff",
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "100%",
    backgroundColor: "#6B46C1",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#6b6b6bff",
    marginBottom: 20,
    marginTop: 20,
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
    paddingBottom: 80,
  },
  missionCard: {
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
    backgroundColor: "#6B46C1", // Roxo para missões desbloqueadas
    // Efeito 3D para missões desbloqueadas
    borderWidth: 1,
    borderColor: "#4a0a8a",
    borderBottomWidth: 6, // Mais espesso conforme solicitado
    borderRightWidth: 3,
    borderTopColor: "#8B5FDC",
    borderLeftColor: "#8B5FDC",
  },
  completedCard: {
    backgroundColor: "#68D391", // Verde para missões concluídas
    // Efeito 3D para missões concluídas
    borderWidth: 1,
    borderColor: "#48BB78",
    borderBottomWidth: 6, // Mais espesso conforme solicitado
    borderRightWidth: 3,
    borderTopColor: "#9AE6B4",
    borderLeftColor: "#9AE6B4",
  },
  lockedCard: {
    backgroundColor: "#f5f5f5",
    opacity: 0.6,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  progressContainer: {
    backgroundColor: "#620cb8ff",
    padding: 15,
    borderRadius: 10,
    // Efeito 3D para o container de progresso também
    borderWidth: 1,
    borderColor: "#4a0a8a",
    borderBottomWidth: 3,
    borderRightWidth: 2,
  },
  progressText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    marginBottom: 8,
  },
  progressBar: {
    height: 12,
    backgroundColor: "#6B46C1",
    borderRadius: 4,
    overflow: "hidden",
    // Efeito 3D para a barra de progresso
    borderWidth: 0.5,
    borderColor: "#4a0a8a",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#68D391",
    borderRadius: 4,
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
  missionDescription: {
    fontSize: 14,
    color: "#ffffffff",
    marginBottom: 8,
  },
  missionStatus: {
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
    borderBottomWidth: 6,
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
  missionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  completeButton: {
    backgroundColor: "#68D391", // Verde para o botão completar
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    // Efeito 3D para botão completar
    borderWidth: 1,
    borderColor: "#48BB78",
    borderBottomWidth: 4,
    borderRightWidth: 2,
    borderTopColor: "#9AE6B4",
    borderLeftColor: "#9AE6B4",
  },
  completeButtonText: {
    color: "#4a0a8a", // Texto escuro para contraste com verde
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#6B46C1", // Roxo para o botão fechar
    paddingVertical: 12,
    borderRadius: 8,
    // Efeito 3D para botão fechar
    borderWidth: 1,
    borderColor: "#4a0a8a",
    borderBottomWidth: 4,
    borderRightWidth: 2,
    borderTopColor: "#8B5FDC",
    borderLeftColor: "#8B5FDC",
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
