import { Text, View } from "@/components/Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Platform,
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
    const mandatoryIds = ["1", "2", "3", "4", "5", "6"];
    const mandatoryAchievements = achievements.filter((achievement) =>
      mandatoryIds.includes(achievement.id)
    );
    return mandatoryAchievements.every((achievement) => achievement.completed);
  };

  const loadAchievements = async () => {
    try {
      const [storiesData, challengesData, missionsData, libraryData] =
        await Promise.all([
          AsyncStorage.getItem("@stories_state"),
          AsyncStorage.getItem("challenges"),
          AsyncStorage.getItem("@missions_state"),
          AsyncStorage.getItem("@library"),
        ]);

      const stories = storiesData ? JSON.parse(storiesData) : [];
      const challenges = challengesData ? JSON.parse(challengesData) : [];
      const missions = missionsData ? JSON.parse(missionsData) : [];
      const library = libraryData
        ? JSON.parse(libraryData)
        : { openedPdfs: [] };

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
            "Conquistado ao salvar uma conquista: compartilhe nas redes sociais, ajude a espalhar a mensagem de combate ao etarismo.",
          completed: await checkAppShared(),
          icon: "📣",
          image: achievementImages["6"],
        },
      ];

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

  const checkAllStoriesCompleted = (stories: any[]): boolean => {
    if (!stories || stories.length === 0) return false;
    return stories.every((story: any) => story.completed === true);
  };

  const checkAllChallengesCompleted = (challenges: any[]): boolean => {
    if (!challenges || challenges.length === 0) return false;
    return challenges.every((challenge: any) => challenge.completed === true);
  };

  const checkAllMissionsCompleted = (missions: any[]): boolean => {
    if (!missions || missions.length === 0) return false;
    return missions.every((mission: any) => mission.completed === true);
  };

  const checkAllLibraryDocumentsOpened = (library: any): boolean => {
    if (!library || !library.openedPdfs) return false;
    return library.openedPdfs.length >= 6;
  };

  const checkSOSAccessed = async (): Promise<boolean> => {
    try {
      const sosAccessed = await AsyncStorage.getItem("@sos_accessed");
      return sosAccessed === "true";
    } catch (error) {
      console.error("Erro ao verificar acesso ao SOS:", error);
      return false;
    }
  };

  const checkAppShared = async (): Promise<boolean> => {
    try {
      const appShared = await AsyncStorage.getItem("@app_shared");
      return appShared === "true";
    } catch (error) {
      console.error("Erro ao verificar se app foi compartilhado:", error);
      return false;
    }
  };

  const registerAppShared = async () => {
    try {
      await AsyncStorage.setItem("@app_shared", "true");
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

  const saveAchievementImage = async () => {
    if (!selectedAchievement) return;

    registerAppShared();

    try {
      if (Platform.OS === "web") {
        Alert.alert("Aviso", "Salvar imagem não é suportado no navegador.");
        return;
      }

      const imageSource = selectedAchievement.image;
      const resolvedAsset = Image.resolveAssetSource(imageSource);

      if (!resolvedAsset?.uri) {
        throw new Error("Não foi possível carregar a imagem da conquista.");
      }

      const fileName = `conquista_${selectedAchievement.id}.png`;
      const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

      await FileSystem.downloadAsync(resolvedAsset.uri, fileUri);

      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        throw new Error("Falha ao salvar a imagem no cache.");
      }

      // Solicita permissão e salva na galeria
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        // Se negado, oferece salvar no cache (usuário pode acessar via gerenciador de arquivos)
        Alert.alert(
          "Permissão negada",
          "A imagem foi salva no cache do app. Você pode acessá-la via gerenciador de arquivos.",
          [{ text: "OK" }]
        );
        return;
      }

      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Guardiões do Legado", asset, false);

      Alert.alert("Sucesso", "Imagem salva na galeria!");
    } catch (error) {
      console.error("Erro ao salvar conquista:", error);
      Alert.alert(
        "Erro ao salvar",
        "Não foi possível salvar a imagem. Tente novamente."
      );
    }
  };

  const AchievementItem = ({ achievement }: { achievement: Achievement }) => (
    <TouchableOpacity
      onPress={() => handleAchievementPress(achievement)}
      activeOpacity={0.7}
      style={styles.touchableWrapper}
    >
      <View
        style={[
          styles.achievementItem,
          achievement.completed ? styles.completedCard : styles.incompleteCard,
        ]}
      >
        <View style={styles.emblemaContainer}>
          <Image
            source={achievement.image}
            style={styles.achievementImage}
            resizeMode="contain"
          />
          {achievement.completed && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedBadgeText}>✓</Text>
            </View>
          )}
        </View>

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
            {achievement.completed ? "🎉 Concluída" : "⏳ Em progresso"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Complete atividades para desbloqueá-las
      </Text>

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
                <View style={styles.modalEmblemaContainer}>
                  <Image
                    source={selectedAchievement.image}
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                  {selectedAchievement.completed && (
                    <View style={styles.modalCompletedBadge}>
                      <Text style={styles.modalCompletedBadgeText}>✓</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.modalTitle}>
                  {selectedAchievement.title}
                </Text>
                <Text style={styles.modalDescription}>
                  {selectedAchievement.description}
                </Text>

                {selectedAchievement.completed ? (
                  <Text style={styles.modalSuccessText}>
                    🎉 Parabéns! Você desbloqueou esta conquista!
                  </Text>
                ) : (
                  <Text style={styles.modalLockedText}>
                    🔒 Complete esta conquista para salvá-la!
                  </Text>
                )}

                {selectedAchievement.completed && (
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={saveAchievementImage}
                  >
                    <FontAwesome5 name="download" size={20} color="white" />
                    <Text style={styles.saveButtonText}>Salvar conquista</Text>
                  </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f1f1f1ff",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#6b6b6bff",
    marginBottom: 8,
  },
  refreshButton: {
    backgroundColor: "#6500F5",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
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
    alignSelf: "center",
    width: 4,
    height: 40,
    backgroundColor: "#a6f500",
    borderRadius: 8,
    marginVertical: 32,
  },
  list: {
    width: "100%",
  },
  listContent: {
    paddingBottom: 20,
  },
  touchableWrapper: {
    alignSelf: "flex-start",
    width: "100%",
  },
  achievementItem: {
    flexDirection: "row",
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    alignItems: "flex-start",
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    minHeight: 0,
    flexShrink: 1,
    flexGrow: 0,
  },
  emblemaContainer: {
    backgroundColor: "transparent",
    alignItems: "center",
    marginRight: 12,
    flexShrink: 0,
    maxWidth: 80,
    width: 80,
  },
  achievementImage: {
    alignSelf: "center",
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    height: 80,
  },
  completedBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#48BB78",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  completedBadgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  progressContainer: {
    backgroundColor: "#6500F5ff",
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
    backgroundColor: "#543C75",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#A6F500",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#A6F500",
    borderRadius: 4,
  },
  incompleteCard: {
    backgroundColor: "#6500F5",
    borderColor: "#4a0a8a",
    borderTopColor: "#8B5FDC",
    borderLeftColor: "#8B5FDC",
  },
  completedCard: {
    backgroundColor: "#A6F500",
    borderColor: "#48BB78",
    borderTopColor: "#9AE6B4",
    borderLeftColor: "#9AE6B4",
  },
  textContainer: {
    flexShrink: 1,
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
    justifyContent: "flex-start",
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    flexShrink: 1,
  },
  incompleteText: {
    color: "white",
  },
  completedText: {
    color: "#2d3748",
  },
  achievementDescription: {
    fontSize: 13,
    marginBottom: 6,
    lineHeight: 16,
    flexShrink: 1,
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
  modalEmblemaContainer: {
    position: "relative",
    marginBottom: 20,
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 16,
  },
  modalCompletedBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#48BB78",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  modalCompletedBadgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#6500F5ff",
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
    color: "#314700",
    fontWeight: "600",
  },
  modalLockedText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    width: "100%",
    borderWidth: 1,
    borderColor: "#0066CC",
    borderBottomWidth: 4,
    borderRightWidth: 2,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  closeModalButton: {
    backgroundColor: "#E1306C",
    padding: 12,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C13584",
    borderBottomWidth: 4,
    borderRightWidth: 2,
    borderTopColor: "#FD1D1D",
    borderLeftColor: "#FD1D1D",
  },
  closeModalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
