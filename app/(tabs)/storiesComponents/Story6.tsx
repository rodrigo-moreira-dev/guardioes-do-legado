// storiesComponents/Story1.tsx
import FloatingText from "@/app/components/FloatingText";
import TypingText from "@/app/components/TypingText";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import BaseStory, { FOOTER_HEIGHT } from "./BaseStory";

export const Story6 = ({
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
  const storiesImages = [
    {
      image: require("../../../assets/images/stories/story6/cena_22.png"),
    },
    {
      image: require("../../../assets/images/stories/story6/cena_23.png"),
    },
    {
      image: require("../../../assets/images/stories/story6/cena_24.png"),
    },
    {
      image: require("../../../assets/images/stories/story6/cena_25.png"),
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
          <TypingText
            text="— Mago Alonso, sua barba me lembra suas amigas no céu! — comentou a flor."
            style={styles.textSceneGirassol}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={1} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[0].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <FloatingText
            children={
              <TypingText
                text="— Hahahaha, sim! Cada fio de cabelo branco conta uma história. Um fio pode conter uma sabedoria, uma gargalhada, uma aventura, uma lágrima! — explicou ele."
                style={styles.textScene2}
              ></TypingText>
            }
          ></FloatingText>
        </View>
      </View>
    </View>,
    <View key={2} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[0].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="— Que incrível! Você consegue me mostrar o mundo quando ainda havia um Sol? — pediu ela."
            style={styles.textSceneGirassol}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={3} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[0].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <FloatingText
            children={
              <TypingText
                text="— Mas é claro, veja!"
                style={styles.textScene2}
              ></TypingText>
            }
          ></FloatingText>
        </View>
      </View>
    </View>,
    <View key={4} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[1].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Ele arrancou um fio de sua barba, o chacoalhou e uma nuvem fofa apareceu entre os dois."
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={5} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[2].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Dentro dela, era possível enxergar um lindo céu, cheio de nuvens douradas, uma estrela branca brilhando acima de todas e um arco-íris escorregando até o horizonte."
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={6} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[3].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Os olhos do girassol marejaram de emoção. Que visão fantástica!"
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
  ];

  return (
    <BaseStory
      onClose={onClose}
      steps={steps}
      currentStep={currentStep}
      onStepChange={onStepChange}
      onComplete={onComplete}
      storyTitle="Uma memória"
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
    bottom: 0,
    paddingTop: 20,
    paddingBottom: FOOTER_HEIGHT,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  textOverlayScene2: {
    position: "absolute",
    bottom: 0,
    paddingTop: 20,
    paddingBottom: FOOTER_HEIGHT,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  textSceneGirassol: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 26,
    textAlign: "center",
    textShadowColor: "#B8860B",
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 4,
    fontFamily: "Georgia",
    fontStyle: "italic",
    letterSpacing: 0.3,
    backgroundColor: "rgba(19, 139, 23, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  textScene1: {
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    shadowColor: "black",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 24,
    textAlign: "center",
  },
  textScene2: {
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    shadowColor: "black",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 24,
    textAlign: "center",
  },
  normalText: {
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    shadowColor: "black",
    fontSize: 18,
    lineHeight: 28,
    textAlign: "center",
    color: "#333",
  },
});
