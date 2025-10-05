import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

interface FloatingTextProps {
  children: React.ReactNode;
}

const FloatingBugText: React.FC<FloatingTextProps> = ({ children }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true, // Performance nativa
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  // Animação de posição
  const translateY = animatedValue.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -4, -6, -4, 0],
  });

  // Animação de brilho (usando canal alpha na cor)
  const glowColor = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      "rgba(255, 215, 0, 0.4)", // Dourado com 40% opacidade
      "rgba(255, 215, 0, 0.8)", // Dourado com 80% opacidade
      "rgba(255, 215, 0, 0.4)", // Retorna a 40%
    ],
  });

  return (
    <Animated.Text
      style={[
        styles.wizardText,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      {children}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  wizardText: {
    fontSize: 32,
    fontWeight: "600",
    fontFamily: "Georgia",
    color: "#4B0082", // Índigo (cor base)
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    letterSpacing: 1.2,
    textAlign: "center",
    paddingHorizontal: 20,
    fontStyle: "italic",
  },
});

export default FloatingBugText;
