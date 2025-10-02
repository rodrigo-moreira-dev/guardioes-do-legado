import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "@/components/Themed";

// Tipos para as conquistas
interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: string;
}

export default function TabFourScreen() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      // Carrega os dados do localStorage
      const [storiesData, challengesData, missionsData, libraryData] =
        await Promise.all([
          AsyncStorage.getItem("@stories_state"),
          AsyncStorage.getItem("challenges"),
          AsyncStorage.getItem("@missions_state"),
          AsyncStorage.getItem("@library"),
        ]);

      // Parse dos dados
      const stories = storiesData ? JSON.parse(storiesData) : [];
      const challenges = challengesData ? JSON.parse(challengesData) : [];
      const missions = missionsData ? JSON.parse(missionsData) : [];
      const library = libraryData
        ? JSON.parse(libraryData)
        : { openedPdfs: [] };

      // Verifica cada conquista
      const allAchievements: Achievement[] = [
        {
          id: "1",
          title: "Leitor Ávido",
          description: "Leu todas as histórias disponíveis",
          completed: checkAllStoriesCompleted(stories),
          icon: "📚",
        },
        {
          id: "2",
          title: "Desafiante Mestre",
          description: "Completou todos os desafios",
          completed: checkAllChallengesCompleted(challenges),
          icon: "🏆",
        },
        {
          id: "3",
          title: "Missão Cumprida",
          description: "Realizou todas as missões",
          completed: checkAllMissionsCompleted(missions),
          icon: "✅",
        },
        {
          id: "4",
          title: "Sábio Estudioso",
          description: "Acessou todos os documentos da biblioteca",
          completed: checkAllLibraryDocumentsOpened(library),
          icon: "🎓",
        },
      ];

      setAchievements(allAchievements);
    } catch (error) {
      console.error("Erro ao carregar conquistas:", error);
    }
  };

  // Verifica se todas as histórias foram completadas
  const checkAllStoriesCompleted = (stories: any[]): boolean => {
    if (!stories || stories.length === 0) return false;
    return stories.every((story: any) => story.completed === true);
  };

  // Verifica se todos os desafios foram completados
  const checkAllChallengesCompleted = (challenges: any[]): boolean => {
    if (!challenges || challenges.length === 0) return false;
    return challenges.every((challenge: any) => challenge.completed === true);
  };

  // Verifica se todas as missões foram completadas
  const checkAllMissionsCompleted = (missions: any[]): boolean => {
    if (!missions || missions.length === 0) return false;
    return missions.every((mission: any) => mission.completed === true);
  };

  // Verifica se todos os documentos da biblioteca foram acessados
  const checkAllLibraryDocumentsOpened = (library: any): boolean => {
    if (!library || !library.openedPdfs) return false;
    // Considerando que temos 6 PDFs no total (IDs de 1 a 6)
    return library.openedPdfs.length >= 6;
  };

  // Componente para cada item da lista de conquistas
  const AchievementItem = ({ achievement }: { achievement: Achievement }) => (
    <View
      style={[
        styles.achievementItem,
        achievement.completed ? styles.completedCard : styles.incompleteCard,
      ]}
    >
      <Text style={styles.icon}>{achievement.icon}</Text>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.achievementTitle,
            achievement.completed
              ? styles.completedText
              : styles.incompleteText,
          ]}
        >
          {achievement.title}
        </Text>
        <Text
          style={[
            styles.achievementDescription,
            achievement.completed
              ? styles.completedDescription
              : styles.incompleteDescription,
          ]}
        >
          {achievement.description}
        </Text>
        <Text
          style={[
            styles.status,
            achievement.completed
              ? styles.completedStatus
              : styles.incompleteStatus,
          ]}
        >
          {achievement.completed ? "✅ Concluída" : "⏳ Em progresso"}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Complete atividades para desbloquear conquistas
      </Text>
      {/* Barra de progresso */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Progresso:{" "}
          {achievements.filter((achievement) => achievement.completed).length}/
          {achievements.length} conquistas obtidas
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${
                  (achievements.filter((achievement) => achievement.completed)
                    .length /
                    achievements.length) *
                  100
                }%`,
              },
            ]}
          />
        </View>
      </View>

      <TouchableOpacity onPress={loadAchievements} style={styles.refreshButton}>
        <Text style={styles.refreshButtonText}>Atualizar Conquistas</Text>
      </TouchableOpacity>

      <View style={styles.separator} />
      {achievements.length === 0 ? (
        <Text style={styles.emptyText}>Carregando conquistas...</Text>
      ) : (
        <FlatList
          data={achievements}
          renderItem={({ item }) => <AchievementItem achievement={item} />}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  refreshButton: {
    backgroundColor: "#6B46C1",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    // Efeito 3D para botão atualizar
    borderWidth: 1,
    borderColor: "#4a0a8a",
    borderBottomWidth: 6,
    borderRightWidth: 3,
    borderTopColor: "#8B5FDC",
    borderLeftColor: "#8B5FDC",
  },
  refreshButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "100%",
    backgroundColor: "#6B46C1",
  },
  list: {
    width: "100%",
  },
  listContent: {
    paddingBottom: 20,
  },
  achievementItem: {
    flexDirection: "row",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    // Efeito 3D base
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 2,
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
  incompleteCard: {
    backgroundColor: "#6B46C1", // Roxo para conquistas não concluídas
    // Efeito 3D para conquistas não concluídas
    borderColor: "#4a0a8a",
    borderTopColor: "#8B5FDC",
    borderLeftColor: "#8B5FDC",
  },
  completedCard: {
    backgroundColor: "#68D391", // Verde para conquistas concluídas
    // Efeito 3D para conquistas concluídas
    borderColor: "#48BB78",
    borderTopColor: "#9AE6B4",
    borderLeftColor: "#9AE6B4",
  },
  icon: {
    fontSize: 32,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  incompleteText: {
    color: "white", // Texto branco para contraste com fundo roxo
  },
  completedText: {
    color: "#2d3748", // Texto escuro para contraste com fundo verde
  },
  achievementDescription: {
    fontSize: 14,
    marginBottom: 6,
  },
  incompleteDescription: {
    color: "rgba(255,255,255,0.9)", // Texto semi-transparente branco
  },
  completedDescription: {
    color: "#2d3748", // Texto escuro
    opacity: 0.8,
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
  },
  incompleteStatus: {
    color: "rgba(255,255,255,0.8)", // Texto semi-transparente branco
  },
  completedStatus: {
    color: "#2d3748", // Texto escuro
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.7,
    marginTop: 50,
    color: "#666",
  },
});
