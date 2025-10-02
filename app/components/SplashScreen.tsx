// components/SplashScreen.tsx
import React, { useEffect, useState } from "react";
import { Animated, ImageSourcePropType, StyleSheet, View } from "react-native";

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const fadeAnim = new Animated.Value(0);

  // Imagens da sequência de splash
  const splashImages: ImageSourcePropType[] = [
    require("../../assets/splash/tela1.png"),
    require("../../assets/splash/tela2.png"),
    require("../../assets/splash/tela3.png"),
  ];

  // Tempos de exibição para cada tela (em milissegundos)
  const screenTimes = [2000, 4000, 3000]; // 2s, 4s, 3s

  useEffect(() => {
    // Fade in inicial da primeira imagem
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // Fade in rápido de 0.5s
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      if (currentImage < splashImages.length - 1) {
        // Fade out da imagem atual
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500, // Fade out rápido de 0.5s
          useNativeDriver: true,
        }).start(() => {
          // Troca para a próxima imagem
          setCurrentImage(currentImage + 1);
          // Fade in da nova imagem
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500, // Fade in rápido de 0.5s
            useNativeDriver: true,
          }).start();
        });
      } else {
        // Última imagem - fade out antes de finalizar
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500, // Fade out final de 0.5s
          useNativeDriver: true,
        }).start(() => {
          onFinish();
        });
      }
    }, screenTimes[currentImage]); // Usa o tempo específico para cada tela

    return () => clearTimeout(timer);
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
