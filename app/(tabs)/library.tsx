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
        console.log("Erro ao abrir PDF:", error);
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
      <Text style={styles.title}>Biblioteca de Documentos</Text>
      <Text style={styles.subtitle}>
        Clique em um documento para visualizar
      </Text>

      {/* Barra de progresso */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Progresso: {progress}/{totalPdfs} documentos acessados
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

      <View style={styles.pdfList}>
        {pdfFiles.map((pdf) => (
          <TouchableOpacity
            key={pdf.id}
            style={[
              styles.pdfButton,
              isPdfOpened(pdf.id) && styles.pdfButtonOpened,
            ]}
            onPress={() => openPdf(pdf)}
          >
            <View style={styles.pdfButtonContent}>
              <Text style={styles.pdfButtonText}>{pdf.title}</Text>
              {isPdfOpened(pdf.id) && (
                <Text style={styles.openedBadge}>✓ Lido</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  progressContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 4,
  },
  pdfList: {
    gap: 12,
  },
  pdfButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pdfButtonOpened: {
    backgroundColor: "#34C759",
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
  openedBadge: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});
