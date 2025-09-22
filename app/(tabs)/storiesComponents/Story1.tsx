// storiesComponents/Story1.tsx
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import brotoImage from "../../../assets/images/broto.png";
import BaseStory from "./BaseStory";

export const Story1 = ({
  currentStep,
  onStepChange,
  onComplete,
}: {
  currentStep: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
}) => {
  const steps = [
    <View key={0}>
      <Text style={styles.text}>
        Na noite estrelada, a lua iluminava uma planície de nuvens com seu belo
        brilho prateado. Flutuando alto no céu, o mago Alonso brincava com as
        antigas nuvens, tão fofas como algodão, elas arremessavam o mago para
        cima como se fosse um trampolim. Em meio à brincadeira, o mago pensa
        avistar algo pequeno e voando até lá ele percebe que é uma semente de
        girassol. Ele já estava deveras feliz, mas um sorriso ainda maior cresce
        em seu rosto e então diz:
      </Text>
    </View>,
    <View key={1}>
      <Image source={brotoImage} style={styles.image} resizeMode="cover" />
      <Text style={styles.text}>
        “Minhas amigas nuvens, o que essa semente faz aqui? É um sinal, é
        esperança!”
      </Text>
    </View>,
    <View key={2}>
      <Text style={styles.text}>
        Com a semente segura em suas mãos, Alonso soube que havia ali uma missão
        mais importante a ser cumprida: a terra firme o aguardava!
      </Text>
    </View>,
  ];

  return (
    <BaseStory
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
    marginTop: 32,
    marginBottom: 16,
    borderRadius: 8,
  },
});
