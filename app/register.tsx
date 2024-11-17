import AuthBackgroud from '@/components/general/AuthBackgroud'
import RegisterForm from '@/components/register/RegisterForm'
import RegisterToLogin from '@/components/register/RegisterToLogin'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

export default function Register() {
  return (
    <AuthBackgroud>
      <Image
          style={styles.tinyLogo}
          source={require("../assets/images/logo-gris-oscuro.png")}
        />
      <View style={styles.registerContainer}>
        <RegisterForm/>
        <RegisterToLogin />
      </View>
    </AuthBackgroud>
  )
}

const styles = StyleSheet.create({
  registerContainer: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  tinyLogo: {
    width: 120,
    height: 95,
  },
});
