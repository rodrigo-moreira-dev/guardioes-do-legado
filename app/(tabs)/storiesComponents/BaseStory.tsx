// storiesComponents/BaseStory.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BaseStoryProps {
  steps: React.ReactNode[]; // Array de slides (cada slide é um componente React)
  currentStep: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
  storyTitle: string;
}

const BaseStory: React.FC<BaseStoryProps> = ({
  steps,
  currentStep,
  onStepChange,
  onComplete,
  storyTitle,
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
      <View style={styles.header}>
        <Text style={styles.title}>{storyTitle}</Text>
        <Text style={styles.stepIndicator}>
          Passo {currentStep + 1} de {steps.length}
        </Text>
      </View>

      <View style={styles.content}>{steps[currentStep]}</View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, currentStep === 0 && styles.disabledButton]}
          onPress={goToPreviousStep}
          disabled={currentStep === 0}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        {currentStep < steps.length - 1 ? (
          <TouchableOpacity style={styles.button} onPress={goToNextStep}>
            <Text style={styles.buttonText}>Avançar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
            <Text style={styles.buttonText}>Concluir</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  stepIndicator: {
    fontSize: 14,
    color: "#666",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  completeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default BaseStory;
