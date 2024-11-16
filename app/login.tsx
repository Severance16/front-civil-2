import AuthBackgroud from "@/components/general/AuthBackgroud";
import LoginForm from "@/components/login/LoginForm";
import LoginToRegister from "@/components/login/LoginToRegister";
import useAuth from "@/hooks/useAuth";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Login() {
    
  return (
    <AuthBackgroud>
      <View style={styles.logoContainer}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/images/logo-gris-oscuro.png")}
        />
        <LoginForm />
        <LoginToRegister />
      </View>
    </AuthBackgroud>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  tinyLogo: {
    width: 180,
    height: 145,
  },
});
