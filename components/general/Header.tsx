import useAuth from "@/hooks/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";

export default function Header() {
  const { signOut } = useAuth();

  const logout = async () => {
    await signOut();
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo-gris-oscuro.png")}
        />
        <TouchableOpacity onPress={logout}>
          <MaterialCommunityIcons name="logout" size={24} color="#262829" />
          <Text style={{ color: "#262829" }}>Salir</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separador}></View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    backgroundColor: "#FFF",
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    height: 80,
    width: 110,
    resizeMode: "cover",
  },
  separador: {
    height: 0.3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
});
