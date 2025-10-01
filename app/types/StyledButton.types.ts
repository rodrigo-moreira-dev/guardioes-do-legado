// types/StyledButton.types.ts
import { ReactNode } from "react";
import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

// Use intersection type em vez de extends para evitar conflitos
export type StyledButtonProps = {
  /** Texto do botão */
  title?: string;
  /** Se o botão está desabilitado */
  disabled?: boolean;
  /** Estilo customizado para o container do botão */
  style?: StyleProp<ViewStyle>;
  /** Estilo customizado para o texto */
  textStyle?: StyleProp<TextStyle>;
  /** Conteúdo customizado (sobrescreve title) */
  children?: ReactNode;
} & Omit<TouchableOpacityProps, "style" | "disabled">; // Remove as props que vamos sobrescrever
