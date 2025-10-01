// storiesComponents/Story1.tsx
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import BaseStory from "./BaseStory";

export const Story10 = ({
  currentStep,
  onStepChange,
  onComplete,
  onClose,
}: {
  currentStep: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
  onClose: () => void;
}) => {
  const steps = [
    <View key={0}>
      <Text style={styles.text}>
        Em uma terra distante, onde a magia ainda florescia, um jovem
        aventureiro recebia sua primeira missão.
      </Text>
    </View>,
    <View key={1}>
      <Image
        source={{ uri: "https://example.com/images/story1_1.jpg" }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.text}>
        O desafio matemático que ele acabara de resolver era apenas o começo de
        uma jornada épica.
      </Text>
    </View>,
    <View key={2}>
      <Text style={styles.text}>
        Com a primeira missão cumprida, novos horizontes se abriam, mas também
        novos perigos.
      </Text>
    </View>,
  ];

  return (
    <BaseStory
      onClose={onClose}
      steps={steps}
      currentStep={currentStep}
      onStepChange={onStepChange}
      onComplete={onComplete}
      storyTitle="A Jornada Inicia"
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
});
