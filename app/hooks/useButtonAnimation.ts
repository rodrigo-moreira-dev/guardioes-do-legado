// hooks/useButtonAnimation.ts
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

interface UseButtonAnimationReturn {
  animatedStyle: {
    transform: Array<{ rotate: Animated.AnimatedInterpolation<string> }>;
  };
}

export const useButtonAnimation = (
  disabled: boolean = false
): UseButtonAnimationReturn => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (disabled) return;

    const animation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [rotateAnim, disabled]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"] as const,
  });

  return {
    animatedStyle: {
      transform: [{ rotate: rotateInterpolate }],
    },
  };
};
