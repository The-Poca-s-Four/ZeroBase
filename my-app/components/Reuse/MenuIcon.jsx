import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
const MenuIcon = () => {
  return (
    <View style={styles.menuIcon}>
      <Text style={styles.menuDots}>⋯</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  menuIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  menuDots: {
    fontSize: 45,
    color: "#000",
    fontWeight: "bold",
  },
});
export default MenuIcon;
