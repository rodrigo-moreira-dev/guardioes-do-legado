// components/SplashScreen.js
import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

export const SplashScreen = ({ onFinish }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const fadeAnim = new Animated.Value(0);

  // Imagens da sequência de splash (substitua pelas suas imagens)
  const splashImages = [
    require("../../assets/images/broto.png"),
    require("../../assets/images/Icones_Caminho.png"),
    require("../../assets/images/Icones_Casa.png"),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentImage < splashImages.length - 1) {
        // Fade out da imagem atual
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          // Troca para a próxima imagem
          setCurrentImage(currentImage + 1);
          // Fade in da nova imagem
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        });
      } else {
        // Finaliza a splash screen
        clearInterval(timer);
        onFinish();
      }
    }, 2000); // Tempo de exibição de cada imagem (2 segundos)

    // Fade in da primeira imagem
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    return () => clearInterval(timer);
  }, [currentImage, onFinish]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={splashImages[currentImage]}
        style={[styles.image, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "80%",
    height: "80%",
  },
});

export default SplashScreen;
