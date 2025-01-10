import { apiMeterologicalSchema, InformationData, informationSchema } from "@/types";
import { weatherCodeParse } from "@/utils/watherCodeParser";
import axios, { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { formatISO, format, parse, parseISO } from 'date-fns';
import clientAxios from "@/clients/clientAxios";

type ProjectAddColaboraborFormProps = {
  projectId: number;
  changeModalVisible: () => void;
};

const dateNow = new Date()


export default function ProjectAddColaboraborForm({ changeModalVisible, projectId }: ProjectAddColaboraborFormProps) {
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false);

  const handleSubmit = async () => {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if (email === "" || !regex.test(email)) {
      Alert.alert("Ingresa un email válido.");
      return;
    }
    try {
      setLoad(true);
      const data = await clientAxios.post<string>(`/project/add-permission`, {email, projectId});
      if (data.status === 200) {
        Alert.alert(data.data)
        changeModalVisible()
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        Alert.alert(error.response.data.error);
      }
    } finally {
      setLoad(false);
    }
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Agregar colaborador!</Text>
        <View style={styles.formContainer}>

          <View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={email}
                placeholder="Correo"
                keyboardType="default"
                autoCapitalize="sentences"
                onChangeText={(e) => {
                  setEmail(e);
                }}
              />
            </View>
          </View>

        </View>

        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => { handleSubmit() }}
          disabled={load}
        >
          <Text style={styles.textStyle}>{load ? "Cargando..." : "Agregar."}</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#EFAD29',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: "#EFAD29",
    fontWeight: '500',
    fontSize: 20
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
  inputContainerSelect: {
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
  formContainer: {
    width: 200,
    margin: 10,
    gap: 10,
  },
});

