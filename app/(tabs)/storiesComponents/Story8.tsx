// storiesComponents/Story1.tsx
import FloatingText from "@/app/components/FloatingText";
import TypingText from "@/app/components/TypingText";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import BaseStory from "./BaseStory";

export const Story8 = ({
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
      image: require("../../../assets/images/stories/story8/cena_35.jpeg"),
    },
    {
      image: require("../../../assets/images/stories/story8/cena_36.png"),
    },
    {
      image: require("../../../assets/images/stories/story8/cena_37.png"),
    },
    {
      image: require("../../../assets/images/stories/story8/cena_38.png"),
    },
    {
      image: require("../../../assets/images/stories/story8/cena_39.png"),
    },
    {
      image: require("../../../assets/images/stories/story8/cena_40.png"),
    },
    {
      image: require("../../../assets/images/stories/story8/cena_41.png"),
    },
    {
      image: require("../../../assets/images/stories/story8/cena_42.png"),
    },
    {
      image: require("../../../assets/images/stories/story8/cena_43.png"),
    },
    {
      image: require("../../../assets/images/stories/story8/cena_44.png"),
    },
    {
      image: require("../../../assets/images/stories/story8/cena_45.png"),
    },
    {
      image: require("../../../assets/images/stories/story8/cena_46.png"),
    },
    {
      image: require("../../../assets/images/stories/story8/cena_47.png"),
    },
    {
      image: require("../../../assets/images/stories/story8/cena_48.png"),
    },
    {
      image: require("../../../assets/images/stories/story8/cena_49.png"),
    },
    {
      image: require("../../../assets/images/stories/story8/cena_50.png"),
    },
    {
      image: require("../../../assets/images/stories/story8/cena_51.png"),
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
            text="Andando por um pântano, eles avistaram uma nuvem caminhando sobre o solo."
            style={styles.textScene1}
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
          <TypingText
            text="— Olha, uma de suas amigas, mago! — exclamou a flor."
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
          <FloatingText
            children={
              <TypingText
                text="— Não pode ser… — murmurou Alonso, enquanto uma gota de suor escorria de sua testa. A nuvem que se aproximava, na verdade, era formada por gafanhotos!"
                style={styles.textScene2}
              ></TypingText>
            }
          ></FloatingText>
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
            text="O mago deu um passo à frente e ficou entre eles e a flor."
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
            text="— Temos fome… — implorou o primeiro."
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
            text="— Nos dê essa flor! — exigiu o segundo."
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
            text="— Ele já é velho, fraco e cansado. O que poderia fazer contra nós? — zombou o terceiro."
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={7} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[4].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="E como se atendesse a um chamado, o velho mago juntou as mãos, bateu o cajado no chão"
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
            text="Uma poderosa ventania afastou os gafanhotos."
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
            text="— Que incrível! Estamos a salvo! — disse a flor, aliviada."
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
          <FloatingText
            children={
              <TypingText
                text="— Ainda não, não foi o suficiente… — observou o mago."
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
            text="Os gafanhotos haviam se dispersado, mas, no horizonte, formaram novamente uma nuvem e retornavam para atacá-los."
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
          <FloatingText
            children={
              <TypingText
                text="— Eu… estou sem forças, o que faremos? — perguntou o mago."
                style={styles.textScene2}
              ></TypingText>
            }
          ></FloatingText>
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
            text="Era sempre o mago quem cuidava e salvava o dia. Mas, nesse momento, um pensamento passou pela cabeça da flor."
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
            text="Ela deu um passo adiante e, conforme a nuvem de gafanhotos se aproximava, gritou:"
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
            text="— Deixem-no em paz!!"
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
            text="E com sua poderosa voz, suas pétalas brilharam."
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
            text="Brilharam com tanta intensidade que os gafanhotos ficaram cegos!"
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
            text="A nuvem passou por eles e foi para bem longe."
            style={styles.textScene2}
          ></TypingText>
        </View>
      </View>
    </View>,
    <View key={19} style={styles.fullScreenStep}>
      <View style={styles.imageContainer}>
        <Image
          source={storiesImages[16].image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textOverlayScene2}>
          <TypingText
            text="Alonso sorriu satisfeito. Nunca estivera tão orgulhoso em toda a sua vida. Sentiu-se realizado."
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
