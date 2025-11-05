import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default function AppLogo({ size = 100, textSize = 24 }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Logo.png")}
        style={{ width: size, height: size, resizeMode: "contain" }}
      />
      <Text style={[styles.text, { fontSize: textSize }]}>Zero Base</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 10,
    fontWeight: "700",
    color: "#000",
  },
});
