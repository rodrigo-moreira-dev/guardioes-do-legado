// storiesComponents/BaseStory.tsx
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BaseStoryProps {
  steps: React.ReactNode[]; // Array de slides (cada slide é um componente React)
  currentStep: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
  onClose: () => void; // Nova prop para fechar o modal
  storyTitle: string;
  lastStory?: boolean;
}

const BaseStory: React.FC<BaseStoryProps> = ({
  steps,
  currentStep,
  onStepChange,
  onComplete,
  onClose, // Recebe a função para fechar o modal
  storyTitle,
  lastStory = false,
}) => {
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      onStepChange(currentStep + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header com botão Voltar e título alinhados */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onClose} // Agora fecha o modal
        >
          <FontAwesome5 name="arrow-left" size={20} color="#6500F5" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{storyTitle}</Text>
          <Text style={styles.stepIndicator}>
            Passo {currentStep + 1} de {steps.length}
          </Text>
        </View>
      </View>

      <View style={lastStory ? styles.lastContent : styles.content}>
        {steps[currentStep]}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.backButtonFooter,
            currentStep === 0 && styles.disabledButton,
          ]}
          onPress={goToPreviousStep}
          disabled={currentStep === 0}
        >
          <FontAwesome5
            name="arrow-left"
            size={20}
            color={currentStep === 0 ? "#ccc" : "#6500F5ffe"}
          />
        </TouchableOpacity>

        {currentStep < steps.length - 1 ? (
          <TouchableOpacity
            style={
              lastStory
                ? [styles.button, styles.lastStoryNextButton]
                : [styles.button, styles.nextButton]
            }
            onPress={goToNextStep}
          >
            <FontAwesome5 name="arrow-right" size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={
              lastStory
                ? [styles.button, styles.lastStoryCompleteButton]
                : [styles.button, styles.completeButton]
            }
            onPress={onComplete}
          >
            <Text style={styles.completeButtonText}>
              {lastStory ? "Guardar legado." : "Concluir"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    // Efeito 3D para botão voltar
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderBottomWidth: 3,
    borderRightWidth: 2,
    borderTopColor: "#f8f8f8",
    borderLeftColor: "#f8f8f8",
    borderRadius: 8,
    backgroundColor: "white",
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#6500F5",
  },
  titleContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6500F5ff",
    textAlign: "right",
  },
  stepIndicator: {
    fontSize: 14,
    color: "#6b6b6bff",
    textAlign: "right",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#402E5C",
  },
  lastContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9d81fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "#fff",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    // Efeito 3D base
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 2,
  },
  backButtonFooter: {
    backgroundColor: "#f8f8f8",
    borderColor: "#d1d1d1",
    borderTopColor: "#f8f8f8",
    borderLeftColor: "#f8f8f8",
  },
  nextButton: {
    backgroundColor: "#6500F5", // Roxo para avançar
    borderColor: "#4a0a8a",
    borderTopColor: "#8B5FDC",
    borderLeftColor: "#8B5FDC",
  },
  lastStoryNextButton: {
    backgroundColor: "#A6F500", // Roxo para avançar
    borderColor: "#97D800",
  },
  completeButton: {
    backgroundColor: "#A6F500", // Verde para concluir
    borderColor: "#48BB78",
    borderTopColor: "#9AE6B4",
    borderLeftColor: "#9AE6B4",
  },
  lastStoryCompleteButton: {
    backgroundColor: "#DBBA00", // Verde para concluir
    borderColor: "#BEA200",
  },
  disabledButton: {
    backgroundColor: "#f5f5f5",
    borderColor: "#d1d1d1",
    borderTopColor: "#f5f5f5",
    borderLeftColor: "#f5f5f5",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  completeButtonText: {
    color: "#3B371E", // Texto escuro para contraste com verde
    fontWeight: "bold",
    fontSize: 16,
  },

  disabledButtonText: {
    color: "#999",
  },
});

export default BaseStory;
