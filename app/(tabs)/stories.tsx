// app/(tabs)/stories.tsx
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
          <ActivityIndicator size="large" color="#007AFF" />
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
          />
        );
      case 2:
        return (
          <Story2
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
          />
        );
      case 3:
        return (
          <Story3
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
          />
        );
      case 4:
        return (
          <Story4
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
          />
        );
      case 5:
        return (
          <Story5
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
          />
        );
      case 6:
        return (
          <Story6
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
          />
        );
      case 7:
        return (
          <Story7
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
          />
        );
      case 8:
        return (
          <Story8
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
          />
        );
      case 9:
        return (
          <Story9
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
          />
        );
      case 10:
        return (
          <Story10
            currentStep={storyState.currentStep}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
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
        <Text style={styles.title}>Todas as Histórias</Text>
        <Text style={styles.subtitle}>
          {unlockedStories.length} de {localStoriesState.length} desbloqueadas
        </Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={refreshStoriesState}
        >
          <Text style={styles.refreshButtonText}>Atualizar</Text>
        </TouchableOpacity>
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
                  !story.unlocked && styles.lockedText,
                ]}
              >
                Capítulo {story.id}
              </Text>
            </View>
            <Text
              style={[styles.storyStatus, !story.unlocked && styles.lockedText]}
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
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    padding: 16,
    alignItems: "center",
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
    marginBottom: 10,
  },
  refreshButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginTop: 5,
  },
  refreshButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
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
  storyCard: {
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
  unlockedCard: {
    backgroundColor: "white",
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  completedCard: {
    backgroundColor: "#f0f9f0",
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  lockedCard: {
    backgroundColor: "#f5f5f5",
    opacity: 0.7,
    borderLeftWidth: 4,
    borderLeftColor: "#ccc",
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
  },
  unlockedNumber: {
    backgroundColor: "#007AFF",
  },
  completedNumber: {
    backgroundColor: "#4CAF50",
  },
  lockedNumber: {
    backgroundColor: "#ccc",
  },
  storyNumber: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  storyStatus: {
    fontSize: 14,
    color: "#666",
  },
  lockedText: {
    color: "#999",
  },
});
