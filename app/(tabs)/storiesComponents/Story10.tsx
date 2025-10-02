// storiesComponents/Story1.tsx
import TypingText from "@/app/components/TypingText";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
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
  const storiesImages = [
    {
      image: require("../../../assets/images/stories/story10/cena_59.png"),
    },
    {
      image: require("../../../assets/images/stories/story10/cena_60.png"),
    },
    {
      image: require("../../../assets/images/stories/story10/cena_61.png"),
    },
    {
      image: require("../../../assets/images/stories/story10/cena_62.png"),
    },
    {
      image: require("../../../assets/images/stories/story10/cena_63.png"),
    },
    {
      image: require("../../../assets/images/stories/story10/cena_64.png"),
    },
    {
      image: require("../../../assets/images/stories/story10/cena_65.png"),
    },
    {
      image: require("../../../assets/images/stories/story10/cena_66.png"),
    },
    {
      image: require("../../../assets/images/stories/story10/cena_67.png"),
    },
    {
      image: require("../../../assets/images/stories/story10/cena_68.png"),
    },
    {
      image: require("../../../assets/images/stories/story10/cena_69.png"),
    },
    {
      image: require("../../../assets/images/stories/story10/cena_70.png"),
    },
    {
      image: require("../../../assets/images/stories/story10/cena_71.png"),
    },
    {
      image: require("../../../assets/images/stories/story10/cena_72.png"),
    },
    {
      image: require("../../../assets/images/stories/story10/cena_73.png"),
    },
    {
      image: require("../../../assets/images/stories/story1/cena_0.png"),
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
            text="A chuva começou a banhar a flor, e as gotas escorriam por seu rosto triste, misturando-se às lágrimas."
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
            text="— Isso não é justo! — soluçava."
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
            text="Olhando para os céus, viu uma nova nuvem se formando, fofa e branca como algodão."
            style={styles.textScene1}
          ></TypingText>
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
          <TypingText
            text="Ela olhou para a poça d’água no chão e viu nela o próprio reflexo."
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
            text="— Eu… eu não consegui te proteger, eu não sou um Sol!! — chorou."
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
            text="Na poça d’água, contemplou as nuvens, as estrelas e a lua. Percebeu que não estaria ali se não fosse pelo seu cuidador."
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={6} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[4].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Naquele momento, entendeu algo muito importante."
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={7} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[5].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Juntou suas mãozinhas esverdeadas e, chorando lágrimas douradas, prometeu:"
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={8} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[5].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="— Eu vou guardar na memória aqueles que já se foram… e vou cuidar daqueles que de mim precisam!"
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={9} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[6].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="E em uma explosão de luz,"
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={10} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[7].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="a pequena girassol brilhou tão intensamente que se fez dia."
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={11} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[8].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Ela cresceu, cresceu e subiu aos céus, iluminando a todos."
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={12} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[9].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene1}>
          <TypingText
            text="As nuvens brilhavam alegremente e coloriam o horizonte com uma luz dourada."
            style={styles.textScene1}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={13} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[10].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Uma nuvem de gafanhotos foi para bem longe."
            style={styles.textScene1}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={14} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[11].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Um ipê sem flores parecia enfim florescer."
            style={styles.textScene1}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={15} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[12].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Uma rosa enfim percebia que, na escuridão à sua volta, nada havia."
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={16} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[13].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Um campo de girassóis surgia."
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={17} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[14].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="E uma nuvem branca e fofa estava tão feliz que até chorava um arco-íris."
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={18} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[15].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Uma semente não cresce sozinha."
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={19} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[15].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Uma árvore com raízes fortes não será esquecida."
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
