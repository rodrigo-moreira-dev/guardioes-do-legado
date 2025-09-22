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
      <Text style={styles.title}>Missões</Text>
      <Text style={styles.subtitle}>
        {completedCount} de {totalCount} concluídas
      </Text>

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
              ]}
              onPress={() => handleMissionPress(mission)}
              disabled={!mission.unlocked}
              activeOpacity={0.7}
            >
              <Text style={styles.missionTitle}>{mission.title}</Text>
              <Text style={styles.missionDescription}>
                {mission.description}
              </Text>
              <Text style={styles.missionStatus}>
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
  missionCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  missionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  missionDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  missionStatus: {
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
  missionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  completeButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  completeButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
