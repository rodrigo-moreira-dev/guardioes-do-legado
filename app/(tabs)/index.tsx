// components/ScrollScreen.tsx
import { Text, View } from "@/components/Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import useLessons from "../hooks/useLessons";

// Não precisamos mais da interface ScrollItem nem das props,
// pois o hook useLessons fornecerá os dados
export default function ScrollScreen() {
  // Usamos o hook personalizado que criamos anteriormente
  const { lessons, isLoading, toggleLesson } = useLessons();

  // Se estiver carregando, mostra um indicador
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>📜 Pergaminhos do Conhecimento</Text>
        <View style={styles.loadingContainer}>
          <Text>Carregando seus pergaminhos...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>📜 Pergaminhos do Conhecimento</Text>

      <ScrollView style={styles.scrollContainer}>
        {lessons.map((lesson, index) => (
          <TouchableOpacity
            key={lesson.id}
            style={styles.scrollWrapper}
            onPress={() => toggleLesson(lesson.id)}
            activeOpacity={0.7}
          >
            {/* Pergaminho */}
            <View style={[styles.scroll, lesson.done && styles.scrollDone]}>
              {/* Topo do pergaminho (enrolado) */}
              <View style={styles.scrollTop} />

              {/* Conteúdo do pergaminho */}
              <View style={styles.scrollContent}>
                <View style={styles.scrollHeader}>
                  <Text style={styles.scrollTitle}>{lesson.title}</Text>
                  {lesson.done && (
                    <FontAwesome5
                      name="check-circle"
                      size={20}
                      color="#4CAF50"
                    />
                  )}
                </View>

                <View style={styles.contentContainer}>
                  {/* Renderiza a description como conteúdo */}
                  <Text>{lesson.description}</Text>
                </View>
              </View>

              {/* Base do pergaminho (enrolado) */}
              <View style={styles.scrollBottom} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5e6ca", // Cor de papel antigo
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#5d4037",
    fontFamily: "serif",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollWrapper: {
    alignItems: "center",
    marginBottom: 10,
  },
  scroll: {
    width: "100%",
    backgroundColor: "#fff8e1",
    borderWidth: 1,
    borderColor: "#d7ccc8",
    borderRadius: 8,
    marginBottom: 5,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollDone: {
    backgroundColor: "#f1f8e9",
    borderColor: "#c5e1a5",
  },
  scrollTop: {
    height: 15,
    backgroundColor: "#bcaaa4",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  scrollBottom: {
    height: 15,
    backgroundColor: "#bcaaa4",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  scrollContent: {
    padding: 20,
    minHeight: 120,
  },
  scrollHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  scrollTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#5d4037",
    fontFamily: "serif",
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "transparent",
  },
});
