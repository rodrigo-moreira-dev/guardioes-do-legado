import React, { useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TabTwoScreen() {
  const [selectedPdf, setSelectedPdf] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const openPdf = async (pdf: any) => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documentos PDF</Text>
      <Text style={styles.subtitle}>
        Clique em um documento para visualizar
      </Text>

      <View style={styles.pdfList}>
        {pdfFiles.map((pdf) => (
          <TouchableOpacity
            key={pdf.id}
            style={styles.pdfButton}
            onPress={() => openPdf(pdf)}
          >
            <Text style={styles.pdfButtonText}>{pdf.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
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
  pdfList: {
    gap: 15,
  },
  pdfButton: {
    backgroundColor: "#007AFF",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pdfButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
