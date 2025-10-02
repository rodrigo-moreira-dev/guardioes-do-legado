import { Text, View } from "@/components/Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// Tipos para as conquistas
interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: string;
  image: any;
}

export default function TabFourScreen() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  // Imagens das conquistas
  const achievementImages = {
    "1": require("@/assets/achievements/guardiao_missoes.png"),
    "2": require("@/assets/achievements/guardiao_historias.png"),
    "3": require("@/assets/achievements/guardiao_desafios.png"),
    "4": require("@/assets/achievements/guardiao_biblioteca.png"),
    "5": require("@/assets/achievements/guardiao_sos.png"),
    "6": require("@/assets/achievements/guardiao_comunidade.png"),
    "7": require("@/assets/achievements/guardiao_legado.png"),
  };

  useEffect(() => {
    loadAchievements();
  }, []);

  // Verifica se todas as conquistas obrigatórias foram completadas
  const checkAllMandatoryAchievements = (
    achievements: Achievement[]
  ): boolean => {
    const mandatoryIds = ["1", "2", "3", "4", "5"]; // IDs das conquistas obrigatórias
    const mandatoryAchievements = achievements.filter((achievement) =>
      mandatoryIds.includes(achievement.id)
    );
    return mandatoryAchievements.every((achievement) => achievement.completed);
  };

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

      // Cria as conquistas base sem o Guardião do Legado
      const baseAchievements: Achievement[] = [
        {
          id: "1",
          title: "Guardião das Missões",
          description:
            "Conquistado ao concluir todas as missões físicas e digitais disponíveis no aplicativo.",
          completed: checkAllMissionsCompleted(missions),
          icon: "🎯",
          image: achievementImages["1"],
        },
        {
          id: "2",
          title: "Guardião das Histórias",
          description:
            "Conquistado ao ler todas as histórias da jornada do Mago Alonso e seus aliados.",
          completed: checkAllStoriesCompleted(stories),
          icon: "📖",
          image: achievementImages["2"],
        },
        {
          id: "3",
          title: "Guardião dos Desafios",
          description:
            "Conquistado ao completar todos os quizzes e desafios interativos dentro do app.",
          completed: checkAllChallengesCompleted(challenges),
          icon: "🧠",
          image: achievementImages["3"],
        },
        {
          id: "4",
          title: "Guardião da Biblioteca",
          description:
            "Conquistado ao ler todos os conteúdos educativos disponíveis na seção da Biblioteca.",
          completed: checkAllLibraryDocumentsOpened(library),
          icon: "📚",
          image: achievementImages["4"],
        },
        {
          id: "5",
          title: "Guardião do SOS",
          description:
            "Conquistado ao acessar e explorar a área de ajuda do aplicativo, com dicas e apoio para combater o etarismo na prática.",
          completed: await checkSOSAccessed(),
          icon: "🛟",
          image: achievementImages["5"],
        },
        {
          id: "6",
          title: "Guardião da Comunidade",
          description:
            "Conquistado ao compartilhar o app nas redes sociais, ajudando a espalhar a mensagem de combate ao etarismo.",
          completed: await checkAppShared(), // Agora é async
          icon: "📣",
          image: achievementImages["6"],
        },
      ];

      // Agora adiciona o Guardião do Legado baseado nas conquistas base
      const allAchievements: Achievement[] = [
        ...baseAchievements,
        {
          id: "7",
          title: "Guardião do Legado",
          description:
            "Conquistado ao cumprir todas as conquistas obrigatórias: Missões, Histórias, Desafios, Biblioteca e SOS. Representa o nível máximo de maturidade e engajamento com a causa.",
          completed: checkAllMandatoryAchievements(baseAchievements),
          icon: "🏅",
          image: achievementImages["7"],
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

  // Verifica se o SOS foi acessado
  const checkSOSAccessed = async (): Promise<boolean> => {
    try {
      const sosAccessed = await AsyncStorage.getItem("@sos_accessed");
      return sosAccessed === "true";
    } catch (error) {
      console.error("Erro ao verificar acesso ao SOS:", error);
      return false;
    }
  };

  // Verifica se o app foi compartilhado
  const checkAppShared = async (): Promise<boolean> => {
    try {
      const appShared = await AsyncStorage.getItem("@app_shared");
      return appShared === "true";
    } catch (error) {
      console.error("Erro ao verificar se app foi compartilhado:", error);
      return false;
    }
  };

  // Função para registrar que o usuário compartilhou uma conquista
  const registerAppShared = async () => {
    try {
      await AsyncStorage.setItem("@app_shared", "true");
      console.log("Compartilhamento do app registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar compartilhamento do app:", error);
    }
  };

  const handleAchievementPress = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAchievement(null);
  };

  const shareOnInstagram = async () => {
    if (!selectedAchievement) return;

    try {
      const isSharingAvailable = await Sharing.isAvailableAsync();

      if (!isSharingAvailable) {
        Alert.alert(
          "Erro",
          "Compartilhamento não disponível neste dispositivo"
        );
        return;
      }

      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Precisamos de permissão para salvar e compartilhar imagens."
        );
        return;
      }

      const message = `🎉 Conquista desbloqueada! ${selectedAchievement.icon} ${selectedAchievement.title}\n${selectedAchievement.description}\n\nCompartilhado via Meu App`;

      await Sharing.shareAsync(selectedAchievement.image, {
        mimeType: "image/png",
        dialogTitle: "Compartilhar conquista no Instagram",
        UTI: "public.image",
      });

      // Registra que o usuário compartilhou uma conquista
      await registerAppShared();

      // Atualiza as conquistas para refletir a mudança
      await loadAchievements();
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
      Alert.alert(
        "Erro ao compartilhar",
        "Não foi possível compartilhar a conquista. Tente novamente."
      );
    }
  };

  // Componente para cada item da lista de conquistas
  const AchievementItem = ({ achievement }: { achievement: Achievement }) => (
    <TouchableOpacity
      onPress={() => handleAchievementPress(achievement)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.achievementItem,
          achievement.completed ? styles.completedCard : styles.incompleteCard,
        ]}
      >
        {/* Imagem da conquista em vez do ícone */}
        <Image
          source={achievement.image}
          style={styles.achievementImage}
          resizeMode="contain"
        />
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
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conquistas</Text>
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

      {/* Modal de compartilhamento */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedAchievement && (
              <>
                {/* Imagem maior no modal */}
                <Image
                  source={selectedAchievement.image}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
                <Text style={styles.modalTitle}>
                  {selectedAchievement.title}
                </Text>
                <Text style={styles.modalDescription}>
                  {selectedAchievement.description}
                </Text>

                {selectedAchievement.completed ? (
                  <>
                    <Text style={styles.modalSuccessText}>
                      🎉 Parabéns! Você desbloqueou esta conquista!
                    </Text>
                    <TouchableOpacity
                      style={styles.instagramButton}
                      onPress={shareOnInstagram}
                    >
                      <FontAwesome5 name="instagram" size={20} color="white" />
                      <Text style={styles.instagramButtonText}>
                        Compartilhar Conquista
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.shareHint}>
                      Selecione o Instagram no menu de compartilhamento
                    </Text>
                  </>
                ) : (
                  <Text style={styles.modalLockedText}>
                    🔒 Complete esta conquista para compartilhar suas
                    conquistas!
                  </Text>
                )}

                <TouchableOpacity
                  style={styles.closeModalButton}
                  onPress={closeModal}
                >
                  <Text style={styles.closeModalButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Os estilos permanecem os mesmos...
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
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 2,
  },
  achievementImage: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 8,
  },
  progressContainer: {
    backgroundColor: "#620cb8ff",
    padding: 15,
    borderRadius: 10,
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
    borderWidth: 0.5,
    borderColor: "#4a0a8a",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#68D391",
    borderRadius: 4,
  },
  incompleteCard: {
    backgroundColor: "#6B46C1",
    borderColor: "#4a0a8a",
    borderTopColor: "#8B5FDC",
    borderLeftColor: "#8B5FDC",
  },
  completedCard: {
    backgroundColor: "#68D391",
    borderColor: "#48BB78",
    borderTopColor: "#9AE6B4",
    borderLeftColor: "#9AE6B4",
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
    color: "white",
  },
  completedText: {
    color: "#2d3748",
  },
  achievementDescription: {
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 18,
  },
  incompleteDescription: {
    color: "rgba(255,255,255,0.9)",
  },
  completedDescription: {
    color: "#2d3748",
    opacity: 0.8,
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
  },
  incompleteStatus: {
    color: "rgba(255,255,255,0.8)",
  },
  completedStatus: {
    color: "#2d3748",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.7,
    marginTop: 50,
    color: "#666",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 16,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderBottomWidth: 6,
    borderRightWidth: 3,
    borderTopColor: "#f8f8f8",
    borderLeftColor: "#f8f8f8",
  },
  modalImage: {
    width: 120,
    height: 120,
    marginBottom: 16,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#620cb8ff",
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
    lineHeight: 22,
  },
  modalSuccessText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#48BB78",
    fontWeight: "600",
  },
  modalLockedText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
    fontWeight: "600",
  },
  instagramButton: {
    backgroundColor: "#E1306C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 8,
    width: "100%",
    borderWidth: 1,
    borderColor: "#C13584",
    borderBottomWidth: 4,
    borderRightWidth: 2,
    borderTopColor: "#FD1D1D",
    borderLeftColor: "#FD1D1D",
  },
  instagramButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  shareHint: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
    fontStyle: "italic",
  },
  closeModalButton: {
    backgroundColor: "#6B46C1",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4a0a8a",
    borderBottomWidth: 4,
    borderRightWidth: 2,
    borderTopColor: "#8B5FDC",
    borderLeftColor: "#8B5FDC",
  },
  closeModalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
