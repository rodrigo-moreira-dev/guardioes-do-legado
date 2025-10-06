import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FOOTER_HEIGHT } from "./storiesComponents/BaseStory";

export default function TabTwoScreen() {
  const [selectedPdf, setSelectedPdf] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [openedPdfs, setOpenedPdfs] = useState<number[]>([]);

  // Lista de PDFs disponíveis
  const pdfFiles = [
    {
      id: 1,
      title: "Cartilha dos direitos",
      fileName: require("@/assets/pdfs/cartilha_direitos.pdf"),
      webUrl:
        "https://drive.google.com/uc?export=download&id=1Yz-HLuU5Fqw00NtJ3NS1mnLqNEjxEeMC",
    },
    {
      id: 2,
      title: "Os direitos da pessoa idosa",
      fileName: require("@/assets/pdfs/direitos_pessoa_idosa.pdf"),
      webUrl:
        "https://drive.google.com/uc?export=download&id=14-WxA9Maoh4jYzpgD2P9665-5lRe6pzd",
    },
    {
      id: 3,
      title: "Glossário",
      fileName: require("@/assets/pdfs/glossario.pdf"),
      webUrl:
        "https://drive.google.com/uc?export=download&id=1PRrrJ8yy-eoTnFqPzRTDR3qF74L3wmfV",
    },
    {
      id: 4,
      title: "Guia de combate ao etarismo",
      fileName: require("@/assets/pdfs/guia_combate.pdf"),
      webUrl:
        "https://drive.google.com/uc?export=download&id=1_9QorI3TSm_J1jXSmKNyymgBHx8FUpLi",
    },
    {
      id: 5,
      title: "Gibi da Turma da Mônica",
      fileName: require("@/assets/pdfs/gibi_monica.pdf"),
      webUrl:
        "https://drive.google.com/uc?export=download&id=1Gl1RDt7-1ArLSYmbTtP14T94bb-0Fogq",
    },
    {
      id: 6,
      title: "Cartilha - Envelhecer nos Territórios",
      fileName: require("@/assets/pdfs/cartilha_envelhecer_territorios.pdf"),
      webUrl:
        "https://drive.google.com/uc?export=download&id=1T14Dldez57WZxhyvK4r-PSGx8EShluyt",
    },
  ];

  // Carrega os PDFs já abertos do localStorage
  useEffect(() => {
    loadOpenedPdfs();
  }, []);

  const loadOpenedPdfs = async () => {
    try {
      const libraryData = await AsyncStorage.getItem("@library");
      if (libraryData) {
        const parsedData = JSON.parse(libraryData);
        setOpenedPdfs(parsedData.openedPdfs || []);
      }
    } catch (error) {
      console.error("Erro ao carregar dados da biblioteca:", error);
    }
  };

  // Salva quando um PDF é aberto
  const saveOpenedPdf = async (pdfId: number) => {
    try {
      let libraryData = await AsyncStorage.getItem("@library");
      let parsedData = libraryData
        ? JSON.parse(libraryData)
        : { openedPdfs: [] };

      // Adiciona o PDF à lista se não estiver já incluído
      if (!parsedData.openedPdfs.includes(pdfId)) {
        parsedData.openedPdfs = [...parsedData.openedPdfs, pdfId];
        await AsyncStorage.setItem("@library", JSON.stringify(parsedData));
        setOpenedPdfs(parsedData.openedPdfs);
      }
    } catch (error) {
      console.error("Erro ao salvar PDF aberto:", error);
    }
  };

  const openPdf = async (pdf: any) => {
    // Registra que o PDF foi aberto
    await saveOpenedPdf(pdf.id);

    if (Platform.OS === "web") {
      // Na web: abre em nova aba
      window.open(pdf.webUrl, "_blank");
    } else {
      // No mobile: tenta abrir com Linking
      try {
        const supported = await Linking.canOpenURL(pdf.webUrl);

        if (supported) {
          await Linking.openURL(pdf.webUrl);
        } else {
          Alert.alert(
            "Erro",
            "Não foi possível abrir o PDF. Verifique se você tem um app leitor de PDF instalado."
          );
        }
      } catch (error) {
        Alert.alert("Erro", "Ocorreu um erro ao abrir o PDF.");
      }
    }
  };

  // Verifica se um PDF específico foi aberto
  const isPdfOpened = (pdfId: number) => {
    return openedPdfs.includes(pdfId);
  };

  // Calcula progresso
  const progress = openedPdfs.length;
  const totalPdfs = pdfFiles.length;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Coleção de Pergaminhos</Text>
      <Text style={styles.subtitle}>
        Toque em um pergaminho para visualizá-lo
      </Text>

      {/* Barra de progresso */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Progresso: {progress}/{totalPdfs} pergaminhos lidos
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(progress / totalPdfs) * 100}%` },
            ]}
          />
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.pdfList}>
        {pdfFiles.map((pdf) => (
          <View key={pdf.id} style={styles.pdfButtonContainer}>
            <TouchableOpacity
              style={[
                styles.pdfButton,
                isPdfOpened(pdf.id) && styles.pdfButtonOpened,
              ]}
              onPress={() => openPdf(pdf)}
            >
              <View style={styles.pdfButtonContent}>
                <Text
                  style={
                    isPdfOpened(pdf.id)
                      ? styles.pdfButtonOpenedText
                      : styles.pdfButtonText
                  }
                >
                  {pdf.title}
                </Text>
                {isPdfOpened(pdf.id) && (
                  <Text style={styles.openedBadge}>✓ Lido</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f1f1f1ff",
  },
  separator: {
    alignSelf: "center",
    width: 4,
    height: 40,
    backgroundColor: "#a6f500",
    borderRadius: 8,
    marginVertical: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6500F5ff",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#6b6b6bff",
    marginVertical: 8,
  },
  progressContainer: {
    backgroundColor: "#6500F5ff",
    padding: 15,
    borderRadius: 10,
    // Efeito 3D para o container de progresso também
    borderWidth: 1,
    borderColor: "#4a0a8a",
    borderBottomWidth: 5,
    borderRightWidth: 4,
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
    // Efeito 3D para a barra de progresso
    borderWidth: 1,
    borderColor: "#eebdffff",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#A6F500",
    borderRadius: 4,
  },
  pdfList: {
    gap: 12,
    paddingBottom: FOOTER_HEIGHT,
  },
  pdfButtonContainer: {
    // Container para o efeito 3D
  },
  pdfButton: {
    backgroundColor: "#6500F5",
    padding: 16,
    borderRadius: 10,
    // Removendo as sombras originais
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,

    // Efeito 3D - bordas para dar profundidade
    borderWidth: 1,
    borderColor: "#4a0a8a", // Cor mais escura para a borda
    borderBottomWidth: 5,
    borderRightWidth: 4,

    // Bordas internas claras para efeito de relevo
    borderTopColor: "#8B5FDC", // Cor mais clara para a borda superior
    borderLeftColor: "#8B5FDC", // Cor mais clara para a borda esquerda
  },
  pdfButtonOpened: {
    backgroundColor: "#A6F500",
    // Efeito 3D para o botão aberto
    borderColor: "#48BB78", // Verde mais escuro
    borderTopColor: "#9AE6B4", // Verde mais claro para borda superior
    borderLeftColor: "#9AE6B4", // Verde mais claro para borda esquerda
    borderBottomWidth: 5,
    borderRightWidth: 4,
  },
  pdfButtonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pdfButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  pdfButtonOpenedText: {
    color: "#3B371E",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  openedBadge: {
    color: "#3B371E",
    fontSize: 12,
    fontWeight: "600",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});
