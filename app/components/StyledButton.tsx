import React from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useButtonAnimation } from "../hooks/useButtonAnimation";
import { ButtonStyles } from "../styles/ButtonStyles";
import { StyledButtonProps } from "../types/StyledButton.types";

const StyledButton: React.FC<StyledButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
  children,
  ...props
}) => {
  const { animatedStyle } = useButtonAnimation(disabled);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        ButtonStyles.button,
        disabled && ButtonStyles.buttonDisabled,
        style,
      ]}
      {...props}
    >
      {/* Overlay de animação */}
      {!disabled && (
        <Animated.View
          style={[
            ButtonStyles.animationOverlay,
            animatedStyle,
            {
              backgroundColor: "#fff",
            },
          ]}
        />
      )}

      {/* Fundo do botão */}
      <View
        style={[
          ButtonStyles.animationBackground,
          disabled && ButtonStyles.animationBackgroundDisabled,
        ]}
      />

      {/* Conteúdo do botão */}
      <View style={{ zIndex: 1 }}>
        {children || (
          <Text
            style={[
              ButtonStyles.text,
              disabled && ButtonStyles.textDisabled,
              textStyle,
            ]}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default StyledButton;
