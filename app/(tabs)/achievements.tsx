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
        achievement.completed ? styles.completed : styles.incomplete,
      ]}
    >
      <Text style={styles.icon}>{achievement.icon}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.achievementTitle}>{achievement.title}</Text>
        <Text style={styles.achievementDescription}>
          {achievement.description}
        </Text>
        <Text style={styles.status}>
          {achievement.completed ? "✅ Concluída" : "⏳ Em progresso"}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={loadAchievements} style={styles.refreshButton}>
        <Text style={styles.refreshButtonText}>Atualizar</Text>
      </TouchableOpacity>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

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
    padding: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  refreshButton: {
    borderWidth: 1,
    borderColor: "#4a0a8a", // Cor mais escura para as bordas direita e inferior
    borderBottomWidth: 6, // Borda inferior mais grossa para profundidade
    borderRightWidth: 4, // Borda direita mais grossa
    borderTopColor: "#bf00ffff", // Cor mais clara para a borda superior
    borderLeftColor: "#bf00ffff",
    backgroundColor: "#620cb8ff",
    borderRadius: 16,
    flex: 1, // Faz os botões terem tamanho igual
    alignItems: "center", // Centraliza o texto
    justifyContent: "center",
  },

  refreshButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 40,
    height: 1,
    width: "100%",
  },
  list: {
    width: "100%",
  },
  listContent: {
    paddingBottom: 20,
  },
  achievementItem: {
    flexDirection: "row",
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  completed: {
    backgroundColor: "#E8F5E8",
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  incomplete: {
    backgroundColor: "#F5F5F5",
    borderLeftWidth: 4,
    borderLeftColor: "#FFC107",
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
  achievementDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 6,
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.7,
    marginTop: 50,
  },
});
