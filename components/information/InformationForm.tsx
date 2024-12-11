import { apiMeterologicalSchema, InformationData, informationSchema } from "@/types";
import { weatherCodeParse } from "@/utils/watherCodeParser";
import axios, { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { formatISO, format } from 'date-fns';
import clientAxios from "@/clients/clientAxios";

type InformationFormProps = {
  projectId: number;
  setInformations: React.Dispatch<React.SetStateAction<InformationData[]>>
  changeModalVisible: () => void;
};

const dateNow = new Date()

const InformationInitCreate: InformationData = {
  date: formatISO(dateNow),
  // id: 99999,
  // state: "",
  humidity: "",
  precipitation: "",
  temperature: "",
  time: "",
  wind: ""
};

export default function InformationForm({ projectId, setInformations, changeModalVisible }: InformationFormProps) {
  const [information, setInformation] = useState(InformationInitCreate);
  const [load, setLoad] = useState(false);

  const handleSubmit = async () => {
    try {
      if (information.date === "") {
        Alert.alert("Cumplir con los campos obligatorios.");
        return;
      }
      setLoad(true);
      const { data } = await clientAxios.post(`/project/${projectId}/information`, information);
      const response = informationSchema.safeParse(data);
      if (response.success) {
        setInformations((prevItems) => [...prevItems, response.data]);
        changeModalVisible();
      } else {
        Alert.alert("Algo sucedio.");
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        Alert.alert(error.response.data.error);
      }
    } finally {
      setLoad(false);
    }
  };

  const getMeteorologicalData = async () => {
    try {
      setLoad(true)
      const apiMeterological = await axios(`https://api.open-meteo.com/v1/forecast?latitude=4.6097&longitude=-74.0817&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=precipitation_probability_max&timezone=America%2FNew_York&forecast_days=1`)

      const response = apiMeterologicalSchema.safeParse(apiMeterological.data)
      const dateRegenerate = new Date()
      if (response.success) {
        setInformation({
          ...information,
          date: formatISO(dateRegenerate),
          time: weatherCodeParse(response.data.current.weather_code),
          humidity: `${response.data.current.relative_humidity_2m} %`,
          temperature: `${response.data.current.temperature_2m} °C`,
          wind: `${response.data.current.wind_speed_10m} km/h`,
          precipitation: `${response.data.daily.precipitation_probability_max[0]} %`
        })
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        Alert.alert("No se pudo obtener datos metereológicos.");
      }
    }finally{
      setLoad(false)
    }
  }

  useEffect(() => {
    getMeteorologicalData()
  }, [])

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Registro diario!</Text>
        <View style={styles.formContainer}>

          <View>
            <Text>Fecha de registro</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={format(information?.date, "dd-MM-yyyy HH:mm:ss")}
                placeholder="Fecha y hora"
                keyboardType="default"
                autoCapitalize="sentences"
                editable={false}
              />
            </View>
          </View>

          <View>
            <Text>Tiempo</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={information?.time || "Código desconocido"}
                keyboardType="default"
                autoCapitalize="sentences"
                editable={false}
              />
            </View>
          </View>
          
          <View>
            <Text>Humedad</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={information?.humidity || "Cargado..."}
                keyboardType="default"
                autoCapitalize="sentences"
                editable={false}
              />
            </View>
          </View>
          
          <View>
            <Text>Precipitaciones</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={information?.precipitation || "Cargando..."}
                keyboardType="default"
                autoCapitalize="sentences"
                editable={false}
              />
            </View>
          </View>
          
          <View>
            <Text>Temperatura</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={`${information?.temperature}` || "Cargando..."}
                keyboardType="default"
                autoCapitalize="sentences"
                editable={false}
              />
            </View>
          </View>
          
          <View>
            <Text>Vientos</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={`${information?.wind}` || "Cargando..."}
                keyboardType="default"
                autoCapitalize="sentences"
                editable={false}
              />
            </View>
          </View>

        </View>

        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => { handleSubmit() }}
          disabled={load}
        >
          <Text style={styles.textStyle}>{load ? "Cargando..." : "Guardar registro."}</Text>
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

