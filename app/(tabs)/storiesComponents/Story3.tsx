// storiesComponents/Story1.tsx
import FloatingText from "@/app/components/FloatingText";
import TypingText from "@/app/components/TypingText";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import BaseStory, { FOOTER_HEIGHT } from "./BaseStory";

export const Story3 = ({
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
      image: require("../../../assets/images/stories/story3/cena_9.png"),
    },
    {
      image: require("../../../assets/images/stories/story3/cena_10.png"),
    },
    {
      image: require("../../../assets/images/stories/story3/cena_11.png"),
    },
    {
      image: require("../../../assets/images/stories/story3/cena_11b.png"),
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
            text="A flor tinha sede de crescimento. Ainda era frágil e, quando a tempestade se aproximava, o mago juntava as mãos e erguia um abrigo de rocha para protegê-la."
            style={styles.textScene1}
          ></TypingText>
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
        <View style={styles.textOverlayScene1}>
          <TypingText
            text="Em meio aos raios e trovões, o mago percebeu que a flor queria muito falar. Juntando as mãos, aproximou-se dela com carinho e a beijou, concedendo-lhe um pouco de sua voz."
            style={styles.textScene1}
          ></TypingText>
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
          <TypingText
            text="— Eu estou com medo! — foram suas primeiras palavras."
            style={styles.textSceneGirassol}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={3} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[2].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <FloatingText
            children={
              <TypingText
                text="— Não há o que temer, estamos seguros! E um dia você será grande e forte — encorajou o mago."
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
          source={storiesImages[2].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="— Eu não sei se acredito… — duvidou a flor."
            style={styles.textSceneGirassol}
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
          <FloatingText
            children={
              <TypingText
                text="— Há uma lenda antiga que dizia que um girassol um dia se tornaria o próprio Sol! — disse ele."
                style={styles.textScene2}
              ></TypingText>
            }
          ></FloatingText>
        </View>
      </View>
    </View>,
    <View key={6} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[2].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="— É mesmo? Me conta mais! — pediu ela, interessada."
            style={styles.textSceneGirassol}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={7} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[3].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <FloatingText
            children={
              <TypingText
                text="— Eu… eu esqueci! Hahahaha! — gargalhou o mago, e a flor riu junto."
                style={styles.textScene2}
              ></TypingText>
            }
          ></FloatingText>
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
      storyTitle="A Tempestade"
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
    paddingBottom: FOOTER_HEIGHT,
    left: 0,
    right: 0,
    paddingTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  textOverlayScene2: {
    position: "absolute",
    bottom: 0,
    paddingBottom: FOOTER_HEIGHT,
    left: 0,
    right: 0,
    paddingTop: 20,
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
    backgroundColor: "rgba(139, 69, 19, 0.1)",
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
