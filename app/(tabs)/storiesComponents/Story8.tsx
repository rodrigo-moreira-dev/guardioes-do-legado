// storiesComponents/Story1.tsx
import FloatingBugText from "@/app/components/FloatingBugText";
import FloatingText from "@/app/components/FloatingText";
import TypingText from "@/app/components/TypingText";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import BaseStory, { FOOTER_HEIGHT } from "./BaseStory";

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
            style={styles.textSceneGirassol}
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
                text="— Não pode ser… — murmurou Alonso, enquanto gotas de suor escorriam de sua testa. A nuvem que se aproximava, na verdade, era formada por gafanhotos!"
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
          <FloatingBugText>
            <TypingText
              text="— Temos fome… — implorou o primeiro."
              style={styles.textSceneGafanhoto}
            ></TypingText>
          </FloatingBugText>
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
          <FloatingBugText>
            <TypingText
              text="— Nos dê essa flor! — exigiu o segundo."
              style={styles.textSceneGafanhoto}
            ></TypingText>
          </FloatingBugText>
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
          <FloatingBugText>
            <TypingText
              text="— Ele já é velho, fraco e cansado. O que poderia fazer contra nós? — zombou o terceiro."
              style={styles.textSceneGafanhoto}
            ></TypingText>
          </FloatingBugText>
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
            text="— DEIXEM-NO EM PAZ!!"
            style={styles.textSceneGreat}
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
            text="Sua voz havia sido um presente do mago e agora o girassol a usava para protegê-lo! As suas pétalas brilharam."
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
            text="Alonso fechou os olhos e sorriu satisfeito. Nunca estivera tão orgulhoso em toda a sua vida. Sentiu-se realizado."
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
      storyTitle="Uma nuvem hostil"
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
  textSceneGafanhoto: {
    color: "#7cffaa", // verde ácido - ótima escolha!
    fontStyle: "italic",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 24,
    textAlign: "center",

    // Efeitos sombrios mais agressivos
    textShadowColor: "#004400", // verde muito escuro
    textShadowOffset: {
      width: 0,
      height: 1, // leve profundidade
    },
    textShadowRadius: 8, // mais espalhado

    // Para Android - sombra mais intensa
    elevation: 3,

    // Efeito de "vibração" visual
    letterSpacing: 0.5, // espaçamento irregular

    // Background sutil para contraste
    backgroundColor: "rgba(0, 20, 0, 0.3)", // fundo verde muito escuro
    paddingHorizontal: 8,
    borderRadius: 4,
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
  textSceneGreat: {
    color: "#FFD700",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    shadowColor: "black",
    textShadowColor: "#ffffffff",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 24,
    textAlign: "center",
    letterSpacing: 0.8,
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
