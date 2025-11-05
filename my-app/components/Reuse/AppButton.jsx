import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function AppButton({
  text,
  color = "#000",
  onPress,
  width = 320,              
  borderColor,              
}) {
  const isWhite = typeof color === "string" && (color === "#fff" || color.toLowerCase() === "white");
  const textColor = isWhite ? "#000" : "#fff";

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: color,
          borderColor: borderColor ?? (isWhite ? "#000" : color), // nền trắng → viền đen
          width,
        },
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
