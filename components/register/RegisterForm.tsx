import clientAxios from "@/clients/clientAxios";
import { UserRegisterForm, userSchema } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isAxiosError } from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const initialUser = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  position: "",
  address: "",
  phone: ""
}

export default function RegisterForm() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visiblePass, setVisiblePass] = useState(true);
  const [confirmVisiblePass, setConfirmVisiblePass] = useState(true);
  const [user, setUser] = useState<UserRegisterForm>(initialUser);
  const [load, setLoad] = useState(false)

  const handleSubmit = async () => {
    if (user.password !== confirmPassword) {
      Alert.alert("Las contraseñas no coinciden.")
      return;
    }
    try {
      setLoad(true)
      const { data } = await clientAxios.post("/auth/create-user", user);
      const response = userSchema.safeParse(data)
      if (response.success) {
        setUser(initialUser)
        Alert.alert("Usuario creado correctamente.")
        router.replace("/login")
      }else{
        Alert.alert("Algo sucedio, vuelve a intentarlo.")
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        Alert.alert(error.response.data.error);
      }
    } finally {
      setLoad(false)
    }
  };

  const changeValue = (key: keyof UserRegisterForm, value: string) => {
    setUser({
      ...user,
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
            value={user?.name}
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
            value={user?.lastname}
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
            value={user?.email}
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
            value={user.password}
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

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            // name="account-tie-hat-outline"
            name="badge-account-outline"
            // arm-flex-outline
            size={20}
            color="#EFAD29"
          />
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              changeValue("position", e);
            }}
            value={user?.position}
            placeholder="Cargo"
            keyboardType="default"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="map-marker-radius-outline"
            size={20}
            color="#EFAD29"
          />
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              changeValue("address", e);
            }}
            value={user?.address}
            placeholder="Dirección"
            keyboardType="default"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="phone-dial"
            size={20}
            color="#EFAD29"
          />
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              changeValue("phone", e);
            }}
            value={user?.phone}
            placeholder="Teléfono"
            keyboardType="number-pad"
            autoCapitalize="words"
          />
        </View>



      </View>
      <Button
        title="Registrarse"
        onPress={handleSubmit}
        accessibilityLabel={load ? "Cargando..." : "Registrarse"}
        color={"#EFAD29"}
        disabled={load}
      />
    </>
  );
}

const styles = StyleSheet.create({
  // formContainer: {
  //   width: 200,
  //   margin: 10,
  //   gap:10
  // },
  // inputContainer: {
  //   display: "flex",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   gap: 2,
  //   borderBottomWidth: 0.3,
  //   borderColor: "#5B5B5E",
  // },
  // input: {
  //   flex: 1,
  //   width: 150,
  //   margin: 0,
  //   paddingHorizontal: 8,
  //   paddingVertical: 6,
  //   color: "#262829",
  // },
  formContainer: {
    width: 200,
    margin: 10,
    gap: 10,
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
