import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface IUser {
  name: string;
  lastname: string;
  email: string;
  password: string;
  position: string;
  address: string;
  phone: string;
}

export default function RegisterForm() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visiblePass, setVisiblePass] = useState(true);
  const [confirmVisiblePass, setConfirmVisiblePass] = useState(true);
  const [data, setData] = useState<IUser>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    position: "",
    address: "",
    phone: "",
  });

  const handleSubmit = async () => {
    try {
      console.log("Registrando...");
    } catch (error) {
      console.log(error);
    }
  };

  const changeValue = (key: keyof IUser, value: string) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const onChangeVisiblePass = () => {
    setVisiblePass(!visiblePass);
  };

  const onChangeConfirmVisiblePass = () => {
    setConfirmVisiblePass(!confirmVisiblePass);
  };

  return (
    <>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="account-outline"
            size={20}
            color="#EFAD29"
          />
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              changeValue("name", e);
            }}
            value={data?.name}
            placeholder="Nombre"
            keyboardType="default"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="account-outline"
            size={20}
            color="#EFAD29"
          />
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              changeValue("lastname", e);
            }}
            value={data?.lastname}
            placeholder="Apellido"
            keyboardType="default"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={20}
            color="#EFAD29"
          />
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              changeValue("email", e);
            }}
            value={data?.email}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={20}
            color="#EFAD29"
          />
          <TextInput
            style={styles.input}
            onChangeText={(e) => changeValue("password", e)}
            value={data.password}
            placeholder="Contraseña"
            keyboardType="default"
            secureTextEntry={visiblePass}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={onChangeVisiblePass}>
            {visiblePass ? (
              <MaterialCommunityIcons
                name="eye-outline"
                size={20}
                color="#EFAD29"
              />
            ) : (
              <MaterialCommunityIcons
                name="eye-off-outline"
                size={20}
                color="#EFAD29"
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={20}
            color="#EFAD29"
          />
          <TextInput
            style={styles.input}
            onChangeText={(e) => setConfirmPassword(e)}
            value={confirmPassword}
            placeholder="Confirma la contraseña"
            keyboardType="default"
            secureTextEntry={confirmVisiblePass}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={onChangeConfirmVisiblePass}>
            {confirmVisiblePass ? (
              <MaterialCommunityIcons
                name="eye-outline"
                size={20}
                color="#EFAD29"
              />
            ) : (
              <MaterialCommunityIcons
                name="eye-off-outline"
                size={20}
                color="#EFAD29"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Button
        title="Iniciar sesión"
        onPress={handleSubmit}
        accessibilityLabel="Iniciar sesión"
        color={"#EFAD29"}
      />
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: 200,
    margin: 10,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    borderBottomWidth: 0.3,
    borderColor: "#5B5B5E",
  },
  input: {
    flex: 1,
    width: 150,
    margin: 0,
    paddingHorizontal: 8,
    paddingVertical: 6,
    color: "#262829",
  },
});
