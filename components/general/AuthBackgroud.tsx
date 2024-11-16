import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";

export default function AuthBackgroud({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={styles.conatiner}>
      <StatusBar style="dark"/>
      <ImageBackground
        source={require("../../assets/images/fondo-2.jpg")}
        style={styles.background}
      >
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
});
