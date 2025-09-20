// app/(tabs)/stories.tsx
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useProgress } from "../hooks/useProgress";

export default function StoriesScreen() {
  const { stories, loading } = useProgress();

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

  const unlockedStories = stories.filter((story) => story.unlocked);

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
            <View key={story.id} style={styles.storyCard}>
              <Text style={styles.storyTitle}>{story.title}</Text>
              <Text style={styles.storyContent}>{story.content}</Text>
            </View>
          ))
        )}
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
  storyCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  storyContent: {
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
});
