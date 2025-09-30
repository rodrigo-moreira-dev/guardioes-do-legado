// storiesComponents/Story1.tsx
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
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
  const storiesImages = [
    {
      image: require("../../../assets/images/stories/story1/cena_0.png"),
    },
    {
      image: require("../../../assets/images/stories/story1/cena_1.png"),
    },
    {
      image: require("../../../assets/images/stories/story1/cena_2.png"),
    },
    {
      image: require("../../../assets/images/stories/story1/cena_3.png"),
    },
    {
      image: require("../../../assets/images/stories/story1/cena_4.png"),
    },
  ];

  const steps = [
    <View key={0} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[0].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene1}>
          <Text style={styles.textScene1}>
            Uma semente não cresce sozinha. Uma árvore com raízes fortes não
            será esquecida.
          </Text>
        </View>
      </View>
    </View>,
    <View key={1} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[1].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <Text style={styles.textScene2}>
            Em uma noite estrelada, a lua iluminava uma planície de nuvens com
            seu belo brilho prateado. Flutuando alto no céu, o mago Alonso
            brincava com as antigas nuvens. Tão fofas quanto algodão, elas
            arremessavam o mago para cima como se fossem um trampolim.
          </Text>
        </View>
      </View>
    </View>,
    <View key={2} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[2].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <Text style={styles.textScene2}>
            Em meio à brincadeira, o mago pensou avistar algo pequeno.
          </Text>
        </View>
      </View>
    </View>,
    <View key={3} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[3].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <Text style={styles.textScene2}>
            Voando até lá, percebeu que era uma semente de girassol. Já estava
            deveras feliz, mas um sorriso ainda maior surgiu em seu rosto.
          </Text>
        </View>
      </View>
    </View>,
    <View key={4} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[4].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <Text style={styles.textScene2}>
            "— Minhas amigas nuvens, o que essa semente faz aqui? É um sinal...
            É esperança! Com a semente segura em suas mãos, Alonso soube que
            havia ali uma missão mais importante a cumprir: a terra firme o
            aguardava. "
          </Text>
        </View>
      </View>
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

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  fullScreenStep: {
    flex: 1,
    marginHorizontal: -16, // Compensa o padding do BaseStory.content
  },
  normalStep: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  imageContainer: {
    position: "relative",
    width: screenWidth,
    height: screenHeight * 0.8, // Ajuste conforme necessário
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textOverlayScene1: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    padding: 40,
  },
  textOverlayScene2: {
    position: "absolute",
    bottom: -16,
    left: 0,
    right: 0,
    padding: 40,
  },
  textScene1: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 24,
    textAlign: "center",
  },
  textScene2: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 24,
    textAlign: "center",
  },
  normalText: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: "center",
    color: "#333",
  },
});
