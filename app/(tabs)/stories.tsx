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
  const { storiesState, loading, setStoryStep, completeStory } = useStories();
  const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Adicionando logs para depuração
  useEffect(() => {
    console.log("StoriesScreen - storiesState:", storiesState);
    console.log("StoriesScreen - loading:", loading);
  }, [storiesState, loading]);

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

  const unlockedStories = storiesState.filter((story) => story.unlocked);
  console.log("Histórias desbloqueadas:", unlockedStories);

  const handleStoryPress = (storyId: number) => {
    console.log(`Clicou na história ${storyId}`);
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

    const storyState = storiesState.find(
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórias Desbloqueadas</Text>
      <Text style={styles.subtitle}>
        {unlockedStories.length} de {storiesState.length} histórias
      </Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {unlockedStories.length === 0 ? (
          <Text style={styles.emptyText}>
            Complete desafios para desbloquear histórias!
          </Text>
        ) : (
          unlockedStories.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={[
                styles.storyCard,
                story.completed && styles.completedCard,
              ]}
              onPress={() => handleStoryPress(story.id)}
              activeOpacity={0.7}
            >
              <View style={styles.storyHeader}>
                <View style={styles.storyNumberContainer}>
                  <Text style={styles.storyNumber}>{story.id}</Text>
                </View>
                <Text style={styles.storyTitle}>História {story.id}</Text>
              </View>
              <Text style={styles.storyStatus}>
                {story.completed ? "✅ Concluída" : "📖 Não lida"}
              </Text>
            </TouchableOpacity>
          ))
        )}
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
  completedCard: {
    backgroundColor: "#f0f9f0",
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
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
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
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
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 50,
  },
});
