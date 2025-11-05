import React from "react";
import { View, Pressable, Image, StyleSheet } from "react-native";


const facebookIcon = require("../../assets/images/facebook.png");
const xIcon = require("../../assets/images/x.png");
const instagramIcon = require("../../assets/images/instagram.png");

export default function SocialButtons() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.iconWrapper} onPress={() => console.log("Facebook pressed")}>
        <Image source={facebookIcon} style={styles.icon} />
      </Pressable>

      <Pressable style={styles.iconWrapper} onPress={() => console.log("X pressed")}>
        <Image source={xIcon} style={styles.icon} />
      </Pressable>

      <Pressable style={styles.iconWrapper} onPress={() => console.log("Instagram pressed")}>
        <Image source={instagramIcon} style={styles.icon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",         
    justifyContent: "center",     
    alignItems: "center",
    gap: 20,                     
    marginVertical: 20,
  },
  iconWrapper: {
    backgroundColor: "#000",      
    borderRadius: 12,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: "#fff",
  },
});
