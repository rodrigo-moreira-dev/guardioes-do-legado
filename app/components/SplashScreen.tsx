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

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentImage < splashImages.length - 1) {
        // Fade out da imagem atual
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }).start(() => {
          // Troca para a próxima imagem
          setCurrentImage(currentImage + 1);
          // Fade in da nova imagem
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }).start();
        });
      } else {
        // Finaliza a splash screen
        clearInterval(timer);
        onFinish();
      }
    }, 2000); // Tempo de exibição de cada imagem (2 segundos)

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
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
