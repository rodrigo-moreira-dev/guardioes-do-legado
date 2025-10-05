// storiesComponents/Story1.tsx
import FloatingText from "@/app/components/FloatingText";
import TypingText from "@/app/components/TypingText";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import BaseStory, { FOOTER_HEIGHT } from "./BaseStory";

export const Story7 = ({
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
      image: require("../../../assets/images/stories/story7/cena_26.png"),
    },
    {
      image: require("../../../assets/images/stories/story7/cena_27.png"),
    },
    {
      image: require("../../../assets/images/stories/story7/cena_28.png"),
    },
    {
      image: require("../../../assets/images/stories/story7/cena_29.png"),
    },
    {
      image: require("../../../assets/images/stories/story7/cena_30.png"),
    },
    {
      image: require("../../../assets/images/stories/story7/cena_31.png"),
    },
    {
      image: require("../../../assets/images/stories/story7/cena_32.png"),
    },
    {
      image: require("../../../assets/images/stories/story7/cena_33.png"),
    },
    {
      image: require("../../../assets/images/stories/story7/cena_34.png"),
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
            text="Andando pelas montanhas frias, os dois se depararam com uma árvore cheia de galhos finos e cansados. Ela já não possuía mais nenhuma folha ou flor."
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
          <FloatingText
            children={
              <TypingText
                text="— Diga, grande Ipê, por que está tão só? — perguntou o mago."
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
          source={storiesImages[2].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Ele juntou as mãos, colocando uma sobre o tronco da árvore e a outra sobre a coroa de pétalas do girassol."
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
            text="— Eu fui esquecida… — disse a árvore bem baixinho — Fui esquecida por quem me plantou, e quem repousava à minha sombra nunca mais voltou."
            style={styles.textSceneIpe}
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
            text="— E, por fim, o Sol nos abandonou. Já não tenho mais utilidade…"
            style={styles.textSceneIpe}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={5} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[4].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="O semblante do girassol era triste."
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={6} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[5].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Notando isso, o mago resolveu animá-lo."
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={7} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[6].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Retirou um dos galhos do grande ipê e o transformou em uma pequena nuvem. Galhos secos também contam histórias!"
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={8} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[7].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Dentro da nuvem, era possível enxergar um enorme ipê, com flores de todas as cores e várias pessoas repousando em sua sombra."
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={9} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[7].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="— Nossa, ele era incrível! Vamos lembrar dele, mago? — pediu o girassol."
            style={styles.textSceneGirassol}
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
          <FloatingText
            children={
              <TypingText
                text="— Ora, mas é claro! Ele era inesquecível! — disse o mago."
                style={styles.textScene2}
              ></TypingText>
            }
          ></FloatingText>
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
            text="O girassol sorriu, feliz por guardar tão bela memória."
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
      storyTitle="Um ipê desflorido"
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
    paddingHorizontal: 16,
    paddingBottom: FOOTER_HEIGHT,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  textOverlayScene2: {
    position: "absolute",
    bottom: 0,
    paddingTop: 20,
    paddingHorizontal: 16,
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
  textSceneIpe: {
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    fontFamily: "Palatino",
    shadowColor: "black",
    color: "#d9d9d9ff",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
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
