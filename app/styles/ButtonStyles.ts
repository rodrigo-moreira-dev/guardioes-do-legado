// ButtonStyles.ts
import { StyleSheet } from "react-native";

export const ButtonStyles = StyleSheet.create({
  button: {
    position: "relative",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 25,
    overflow: "hidden",
    backgroundColor: "#9c27b0",
    borderWidth: 1,
    borderColor: "#000",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  buttonDisabled: {
    pointerEvents: "none",
    opacity: 0.65,
    backgroundColor: "#dcdcdc",
    borderColor: "#7e7e7e",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  textDisabled: {
    color: "#7e7e7e",
  },
  animationOverlay: {
    position: "absolute",
    width: 20,
    height: 170,
    backgroundColor: "transparent",
  },
  animationBackground: {
    position: "absolute",
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    backgroundColor: "#9C27B0",
    borderRadius: 3,
  },
  animationBackgroundDisabled: {
    backgroundColor: "#dcdcdc",
  },
});
