// app/(tabs)/stories.tsx
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useStories } from "../hooks/useStories";
import { Story1 } from "./storiesComponents/Story1";
import { Story10 } from "./storiesComponents/Story10";
import { Story2 } from "./storiesComponents/Story2";
import { Story3 } from "./storiesComponents/Story3";
import { Story4 } from "./storiesComponents/Story4";
import { Story5 } from "./storiesComponents/Story5";
import { Story6 } from "./storiesComponents/Story6";
import { Story7 } from "./storiesComponents/Story7";
import { Story8 } from "./storiesComponents/Story8";
import { Story9 } from "./storiesComponents/Story9";

export default function StoriesScreen() {
  const {
    storiesState,
    loading,
    setStoryStep,
    completeStory,
    refreshTrigger,
    refreshStoriesState,
  } = useStories();
  const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [localStoriesState, setLocalStoriesState] = useState<any[]>([]);
  const navigation = useNavigation();

  const handleUnlockNextStory = () => {
    // Navegar para a tela de desafios
    navigation.navigate("challenges");
  };

  useEffect(() => {
    console.log("StoriesScreen - storiesState:", storiesState);
    console.log("StoriesScreen - loading:", loading);
    console.log("StoriesScreen - refreshTrigger:", refreshTrigger);

    // Atualizar o estado local quando o estado global mudar
    setLocalStoriesState(storiesState);
  }, [storiesState, loading, refreshTrigger]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Histórias</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6500F5" />
          <Text>Carregando histórias...</Text>
        </View>
      </View>
    );
  }

  // Ordenar histórias pelo ID
  const sortedStories = [...localStoriesState].sort((a, b) => a.id - b.id);
  const unlockedStories = sortedStories.filter((story) => story.unlocked);

  console.log("Todas as histórias ordenadas:", sortedStories);
  console.log("Histórias desbloqueadas:", unlockedStories);

  const handleStoryPress = (storyId: number) => {
    console.log(`Clicou na história ${storyId}`);

    // Verificar se a história está desbloqueada antes de abrir
    const story = localStoriesState.find((s) => s.id === storyId);
    if (!story || !story.unlocked) {
      console.log(`História ${storyId} está bloqueada`);
      return;
    }

    setSelectedStoryId(storyId);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedStoryId(null);
  };

  const handleStepChange = async (step: number) => {
    if (selectedStoryId !== null) {
      console.log(`Mudando para passo ${step} da história ${selectedStoryId}`);
      await setStoryStep(selectedStoryId, step);
    }
  };

  const handleComplete = async () => {
    if (selectedStoryId !== null) {
      console.log(`Concluindo história ${selectedStoryId}`);
      await completeStory(selectedStoryId);
      closeModal();
    }
  };

  const renderStoryComponent = () => {
    if (selectedStoryId === null) return null;

    const storyState = localStoriesState.find(
      (story) => story.id === selectedStoryId
    );
    if (!storyState) return null;

    console.log(
      `Renderizando componente da história ${selectedStoryId} com passo atual ${storyState.currentStep}`
    );

    switch (selectedStoryId) {
      case 1:
        return (
          <Story1
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
            onClose={closeModal}
          />
        );
      case 2:
        return (
          <Story2
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
            onClose={closeModal}
          />
        );
      case 3:
        return (
          <Story3
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
            onClose={closeModal}
          />
        );
      case 4:
        return (
          <Story4
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
            onClose={closeModal}
          />
        );
      case 5:
        return (
          <Story5
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
            onClose={closeModal}
          />
        );
      case 6:
        return (
          <Story6
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
            onClose={closeModal}
          />
        );
      case 7:
        return (
          <Story7
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
            onClose={closeModal}
          />
        );
      case 8:
        return (
          <Story8
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
            onClose={closeModal}
          />
        );
      case 9:
        return (
          <Story9
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
            onClose={closeModal}
          />
        );
      case 10:
        return (
          <Story10
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
            onClose={closeModal}
          />
        );
      default:
        return null;
    }
  };

  // Função para determinar o estilo do cartão baseado no estado da história
  const getStoryCardStyle = (story: any) => {
    if (!story.unlocked) {
      return styles.lockedCard;
    }
    if (story.completed) {
      return styles.completedCard;
    }
    return styles.unlockedCard;
  };

  // Função para determinar o estilo do número baseado no estado da história
  const getStoryNumberStyle = (story: any) => {
    if (!story.unlocked) {
      return styles.lockedNumber;
    }
    if (story.completed) {
      return styles.completedNumber;
    }
    return styles.unlockedNumber;
  };

  // Função para determinar o texto de status baseado no estado da história
  const getStoryStatusText = (story: any) => {
    if (!story.unlocked) {
      return "🔒 Bloqueada";
    }
    if (story.completed) {
      return "✅ Concluída";
    }
    return "📖 Não lida";
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.subtitle}>
          Realize desafios para desbloquear histórias
        </Text>
        {/* Barra de progresso */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Progresso:{" "}
            {localStoriesState.filter((story) => story.completed).length}/
            {localStoriesState.length} histórias lidas
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${
                    (localStoriesState.filter((story) => story.completed)
                      .length /
                      localStoriesState.length) *
                    100
                  }%`,
                },
              ]}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={refreshStoriesState}
          >
            <Text style={styles.refreshButtonText}>Atualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.unlockButton}
            onPress={handleUnlockNextStory}
          >
            <Text style={styles.unlockButtonText}>Desbloquear Próxima</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {sortedStories.map((story) => (
          <TouchableOpacity
            key={story.id}
            style={[styles.storyCard, getStoryCardStyle(story)]}
            onPress={() => handleStoryPress(story.id)}
            disabled={!story.unlocked}
            activeOpacity={story.unlocked ? 0.7 : 1}
          >
            <View style={styles.storyHeader}>
              <View
                style={[
                  styles.storyNumberContainer,
                  getStoryNumberStyle(story),
                ]}
              >
                <Text style={styles.storyNumber}>{story.id}</Text>
              </View>
              <Text
                style={[
                  styles.storyTitle,
                  story.completed && styles.completedText,
                  !story.unlocked && styles.lockedText,
                  story.unlocked && !story.completed && styles.unlockedText,
                ]}
              >
                Capítulo {story.id}
              </Text>
            </View>
            <Text
              style={[
                styles.storyStatus,
                story.completed && styles.completedStatus,
                !story.unlocked && styles.lockedStatus,
                story.unlocked && !story.completed && styles.unlockedStatus,
              ]}
            >
              {getStoryStatusText(story)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={closeModal}
      >
        {renderStoryComponent()}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1ff",
  },
  separator: {
    marginVertical: 20,
    height: 4,
    width: "100%",
    backgroundColor: "#6500F5",
    borderRadius: 8,
  },
  progressContainer: {
    backgroundColor: "#6500F5ff",
    width: "100%",
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
    backgroundColor: "#543C75",
    borderRadius: 4,
    overflow: "hidden",
    // Efeito 3D para a barra de progresso
    borderWidth: 0.5,
    borderColor: "#4a0a8a",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#A6F500",
    borderRadius: 4,
  },
  headerContainer: {
    paddingTop: 16,
    paddingRight: 16,
    paddingLeft: 16,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
    width: "100%",
  },
  refreshButton: {
    backgroundColor: "#6500F5",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
    // Efeito 3D para botão atualizar
    borderWidth: 1,
    borderColor: "#4a0a8a",
    borderBottomWidth: 4,
    borderRightWidth: 2,
    borderTopColor: "#8B5FDC",
    borderLeftColor: "#8B5FDC",
  },
  unlockButton: {
    backgroundColor: "#A6F500",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
    // Efeito 3D para botão desbloquear
    borderWidth: 1,
    borderColor: "#48BB78",
    borderBottomWidth: 4,
    borderRightWidth: 2,
    borderTopColor: "#9AE6B4",
    borderLeftColor: "#9AE6B4",
  },
  refreshButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  unlockButtonText: {
    color: "#2d3748",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#6500F5ff",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#6b6b6bff",
    marginBottom: 10,
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
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 80,
  },
  storyCard: {
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
    backgroundColor: "#6500F5", // Roxo para histórias desbloqueadas
    // Efeito 3D para histórias desbloqueadas
    borderWidth: 1,
    borderColor: "#4a0a8a",
    borderBottomWidth: 6,
    borderRightWidth: 3,
    borderTopColor: "#8B5FDC",
    borderLeftColor: "#8B5FDC",
  },
  completedCard: {
    backgroundColor: "#A6F500", // Verde para histórias concluídas
    // Efeito 3D para histórias concluídas
    borderWidth: 1,
    borderColor: "#48BB78",
    borderBottomWidth: 6,
    borderRightWidth: 3,
    borderTopColor: "#9AE6B4",
    borderLeftColor: "#9AE6B4",
  },
  lockedCard: {
    backgroundColor: "#f5f5f5",
    opacity: 0.7,
  },
  storyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  storyNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    // Efeito 3D para números
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  unlockedNumber: {
    backgroundColor: "#8B5FDC",
    borderColor: "#6500F5",
  },
  completedNumber: {
    backgroundColor: "#9AE6B4",
    borderColor: "#A6F500",
  },
  lockedNumber: {
    backgroundColor: "#ccc",
    borderColor: "#999",
  },
  storyNumber: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  unlockedText: {
    color: "white", // Texto branco para contraste com fundo roxo
  },
  completedText: {
    color: "#2d3748", // Texto escuro para contraste com fundo verde
  },
  lockedText: {
    color: "#999",
  },
  storyStatus: {
    fontSize: 14,
    fontWeight: "500",
  },
  unlockedStatus: {
    color: "rgba(255,255,255,0.9)", // Texto semi-transparente branco
  },
  completedStatus: {
    color: "#2d3748", // Texto escuro
  },
  lockedStatus: {
    color: "#999",
  },
});
