import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MenuIcon, SocialButtons, AppLogo, AppButton } from "../Reuse";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
     
      <View style={styles.menu}>
        <MenuIcon />
      </View>

    
      <View style={styles.center}>
        <AppLogo size={96} textSize={32} />

        <Text style={styles.subtitle}>
          Know your limit for{"\n"}a better end of month
        </Text>

        <View style={styles.buttons}>
         
          <AppButton text="Sign in" color="#fff" onPress={() => {}} />

          
          <AppButton text="Sign up" color="#000" onPress={() => {}} />
        </View>

        <Text style={styles.socialTitle}>Log in with Social Media</Text>

        
        <SocialButtons />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 24 },

  menu: { position: "absolute", top: 16, right: 16, zIndex: 10 },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },

  subtitle: {
    marginTop: 8,
    color: "#333",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
  },

  buttons: {
    marginTop: 16,
    width: "100%",
    alignItems: "center",
    gap: 12,
  },

  socialTitle: {
    marginTop: 16,
    color: "#666",
    fontSize: 14,
  },
});
