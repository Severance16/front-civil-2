import AuthBackgroud from "@/components/general/AuthBackgroud";
import LoginForm from "@/components/login/LoginForm";
import LoginToRegister from "@/components/login/LoginToRegister";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function Login() {
    
  return (
    <AuthBackgroud>
      <View style={styles.loginContainer}>
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
  loginContainer: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  tinyLogo: {
    width: 180,
    height: 145,
  },
});
