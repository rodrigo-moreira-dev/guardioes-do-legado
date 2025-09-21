// app/(tabs)/stories.tsx
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useProgress } from "../hooks/useProgress";
import { Story } from "../types/challenges.type";

export default function StoriesScreen() {
  const { stories, loading } = useProgress();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Adicione este log para depurar
  console.log("StoriesScreen render - stories:", stories);
  console.log("StoriesScreen render - loading:", loading);

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

  // Ordenar histórias pelo campo 'order'
  const sortedStories = [...stories].sort((a, b) => a.order - b.order);
  const unlockedStories = sortedStories.filter((story) => story.unlocked);

  const handleStoryPress = (story: Story) => {
    console.log("História selecionada:", story);
    setSelectedStory(story);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedStory(null);
  };

  // Função para renderizar cada seção da história
  const renderSection = (section: any, index: number) => {
    if (section.type === "text") {
      return (
        <Text key={index} style={[styles.storyText, section.style]}>
          {section.content}
        </Text>
      );
    } else if (section.type === "image") {
      return (
        <Image
          key={index}
          source={{ uri: section.content }}
          style={[styles.storyImage, section.style]}
          resizeMode={section.style?.resizeMode || "cover"}
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórias Desbloqueadas</Text>
      <Text style={styles.subtitle}>
        {unlockedStories.length} de {stories.length} histórias
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
              style={styles.storyCard}
              onPress={() => handleStoryPress(story)}
              activeOpacity={0.7}
            >
              <View style={styles.storyHeader}>
                <View style={styles.storyNumberContainer}>
                  <Text style={styles.storyNumber}>{story.order}</Text>
                </View>
                <Text style={styles.storyTitle}>{story.title}</Text>
              </View>
              <Text style={styles.storyPreview}>{story.preview}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Modal para exibir a história completa */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {selectedStory?.title || "História"}
            </Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            {selectedStory &&
            selectedStory.sections &&
            selectedStory.sections.length > 0 ? (
              selectedStory.sections.map((section, index) =>
                renderSection(section, index)
              )
            ) : (
              <Text style={styles.emptyStoryText}>
                Conteúdo da história não disponível.
              </Text>
            )}
          </ScrollView>
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
  storyPreview: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 50,
  },
  // Estilos do Modal
  modalContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  storyText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: "#333",
  },
  storyImage: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  emptyStoryText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 50,
  },
});
