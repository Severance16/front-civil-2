import clientAxios from '@/clients/clientAxios';
import ModalGeneral from '@/components/general/ModalGeneral';
import ReportEditForm from '@/components/report/ReportEditForm';
import ReportInformation from '@/components/report/ReportInformation';
import { ReportData, reportSchema } from '@/types';
import { formatDateLabel } from '@/utils/dateParser';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { isAxiosError } from 'axios';
import { Image } from 'expo-image';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

export default function ReportDashboard() {

  const { type, reportId } = useLocalSearchParams<{
    type: string;
    reportId: string;
  }>();

  const [report, setReport] = useState<ReportData>({
    id: 0,
    activity: "",
    consecutive: "",
    createdAt: "",
    description: "",
    evidence: ""
  })

  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const changeModalVisible = () => {
    setModalVisible(!modalVisible)
  }

  const getReport = async () => {
    if (reportId !== null) {
      try {
        const { data } = await clientAxios.get(`/project/${type}/${reportId}`);
        const response = reportSchema.safeParse(data);
        if (response.success) {
          setReport(response.data);
        }
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          Alert.alert(error.response.data.error);
        }
      }
    }
  };

  useEffect(() => {
    getReport()
  }, [reportId, type])

  const handleDelete = async () => {
    try {
      const { data } = await clientAxios.delete(`/project/${type}/${reportId}`)
      const response = reportSchema.safeParse(data);
        if (response.success) {
          Alert.alert("Reporte eliminado.")
          router.navigate(`/(app)/(project)/report?type=${type}&reportId=${reportId}`)
        }else{
          Alert.alert("Algo ocurrio.")
        }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        Alert.alert(error.response.data.error);
      }
    }
  }
  
  const handleEdit = async () => {
    changeModalVisible()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Información</Text>
      {report.createdAt && (
        <Text style={styles.createdAtd}>Generado: {formatDateLabel(report.createdAt)}</Text>
      )}
      <ScrollView>
        <View style={styles.containerInfo}>
          <ReportInformation report={report} type={type} />
        </View>
        <Text style={styles.tittle}>Evidencia</Text>
        <View style={styles.containerImage}>
          <Image style={styles.image} source={`http://192.168.1.135:4000/statics/${report.evidence}`} alt="Imagen proyecto" />
        </View>

        <Text style={styles.tittle}>Acciones</Text>

        <View style={styles.actionsContainer}>
          <TouchableNativeFeedback onPress={handleEdit}>
            <View style={styles.actionButton}>
              <MaterialCommunityIcons name="pencil-outline" size={24} color="#EFAD29" />
              <Text style={{ width: "auto" }}>Editar</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={handleDelete}>
            <View style={styles.actionButton}>
              <MaterialCommunityIcons name="trash-can-outline" size={24} color="#EFAD29" />
              <Text style={{ width: "auto" }}>Eliminar</Text>
            </View>
          </TouchableNativeFeedback>
        </View>


      </ScrollView>
      <ModalGeneral changeModalVisible={changeModalVisible} modalVisible={modalVisible}>
        <ReportEditForm reportProps={report} type={type} changeModalVisible={changeModalVisible} setReport={setReport}/>
      </ModalGeneral>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 10,
    paddingTop: 10,
  },
  tittle: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "500",
    color: "#EFAD29",
  },
  textActivity: {
    textAlign: "center",
    color: "#262829",
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 5,
    marginVertical: 10
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: '#0553',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  containerInfo: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 5,
    marginBottom: 10
  },
  createdAtd: {
    fontSize: 12,
    paddingLeft: 10,
    color: "#5B5B5E"
  },
  actionsContainer: {
    flexDirection: "row", 
    justifyContent: "space-around",
    margin: 10
  },
  actionButton: {
    width: 90,
    height: 90,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
  }
});
