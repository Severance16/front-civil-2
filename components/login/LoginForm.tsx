import clientAxios from "@/clients/clientAxios";
import useAuth from "@/hooks/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isAxiosError } from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginForm() {
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePass, setVisiblePass] = useState(true);
  const [load, setLoad] = useState(false);

  const handleSubmit = async () => {
    if ([email, password]. includes("")) {
      Alert.alert("Los campos son obligatorios.");
      return
    }
    
    try {
      setLoad(true);
      const { data } = await clientAxios.post<string>("/auth/login", {
        email,
        password,
      });
      await signIn(data);
      router.replace("/(app)");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        Alert.alert(error.response.data.error);
      }
    } finally {
      setLoad(false);
    }
  };
  const changeVisibilityPass = () => {
    setVisiblePass(!visiblePass);
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
            onChangeText={setEmail}
            value={email}
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
            onChangeText={setPassword}
            value={password}
            placeholder="Contraseña"
            keyboardType="default"
            secureTextEntry={visiblePass}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={changeVisibilityPass}>
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
      </View>

      <Button
        title={!load ? "Iniciar sesión" : "Cargando..."}
        onPress={() => handleSubmit()}
        accessibilityLabel="Iniciar sesión"
        color={"#EFAD29"}
        disabled={load}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
