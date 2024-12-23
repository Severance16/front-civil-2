import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";

export default function ProjectAddColaborator({
  changeModalVisible,
}: {
  changeModalVisible: () => void;
}) {
  const handleAddColaborator = () => {};
  return (
    <View style={styles.containerFluid}>
      <TouchableNativeFeedback onPress={changeModalVisible}>
        <View style={styles.container}>
          <Text style={styles.label}>Agregar Colaborador</Text>
          <MaterialCommunityIcons
            name="account-plus-outline"
            size={24}
            color="#EFAD29"
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  containerFluid: {
    alignItems: 'center'
  },
  container: {
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderRadius: 10,
    width: 100,
    gap: 5,
    paddingVertical: 10,
  },
  label: {
    color: "#262829",
    textAlign: "center",
  },
});
