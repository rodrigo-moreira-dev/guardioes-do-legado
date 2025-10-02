// storiesComponents/Story1.tsx
import TypingText from "@/app/components/TypingText";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import BaseStory from "./BaseStory";

export const Story4 = ({
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
      image: require("../../../assets/images/stories/story4/cena_12.png"),
    },
    {
      image: require("../../../assets/images/stories/story4/cena_13.png"),
    },
    {
      image: require("../../../assets/images/stories/story4/cena_14.png"),
    },
    {
      image: require("../../../assets/images/stories/story4/cena_15.png"),
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
            text="O girassol crescia com o passar das semanas, dos meses e dos anos."
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
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Após muito cuidado e várias magias de Alonso, a planta tornou-se especial: conseguia andar movimentando as raízes e agarrar objetos com seus galhos e folhas, que pareciam mãos esverdeadas."
            style={styles.textScene1}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={2} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[1].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Suas pétalas reluziam com a luz das estrelas e da lua."
            style={styles.textScene1}
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
          <TypingText
            text="O mago a acompanhava com seu cajado; sua barba, agora, estava branca e fofa como as nuvens."
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={4} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[3].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Passeando por um jardim esquecido, cheio de plantas murchas, o girassol perguntou:"
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={5} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[3].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="— Mago, afinal, o que houve com o Sol?"
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
            text="— Ora, nunca te falei? Minha memória… há muitos milênios, coisas incríveis foram criadas, inclusive a magia. Mas cada um se importava apenas consigo próprio, e brigavam pela luz… brigaram tanto, tanto até que a luz se acabou."
            style={styles.textScene2}
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
          <TypingText
            text="— Mas a luz não era suficiente para todos?"
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={8} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[3].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="— Para alguns, nem toda a luz do mundo parecia suficiente. Essa é uma lição valiosa!"
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
      storyTitle="Crescimento"
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
    bottom: -20,
    left: 0,
    right: 0,
    padding: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  textOverlayScene2: {
    position: "absolute",
    bottom: -16,
    left: 0,
    right: 0,
    padding: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  textScene1: {
    textShadowColor: "black",
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
    textShadowColor: "black",
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
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    shadowColor: "black",
    fontSize: 18,
    lineHeight: 28,
    textAlign: "center",
    color: "#333",
  },
});
