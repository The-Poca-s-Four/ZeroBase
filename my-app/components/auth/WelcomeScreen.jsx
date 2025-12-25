import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppButton, AppLogo, MenuIcon, SocialButtons } from "../Reuse";

export default function WelcomeScreen({ onLogin, onSignup }) {
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
         
          <AppButton text="Sign in" color="#fff" onPress={onLogin || (() => {})} />

          
          <AppButton text="Sign up" color="#000" onPress={onSignup || (() => {})} />
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
  // Test

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
