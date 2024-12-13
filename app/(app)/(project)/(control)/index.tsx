import clientAxios from '@/clients/clientAxios';
import AssistCard from '@/components/assist/AssistCard';
import AssistEditForm from '@/components/assist/AssistEditForm';
import AssistForm from '@/components/assist/AssistForm';
import ControlInformation from '@/components/control/ControlInformation';
import ModalGeneral from '@/components/general/ModalGeneral';
import InformationEditForm from '@/components/information/InformationEditForm';
import { assistsSchema, AssistData, InformationData, informationSchema, assistSchema } from '@/types';
import { formatDateLabel } from '@/utils/dateParser';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { isAxiosError } from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

const assistsDataFake: AssistData[] = [
    {
        id: 1,
        name: "Sergio Ortiz",
        contractor: "Interno",
        area: "Prueba",
        work: "Prueba"
    },
    {
        id: 2,
        name: "Victor Sanchez",
        contractor: "Contratista",
        area: "Prueba",
        work: "Prueba"
    },
]

export type TypesForm = "createAssist" | "editAssist" | "editInformation"

export default function ControlDetail() {

    const { informationId } = useLocalSearchParams<{ informationId: string }>();
    const [information, setInformation] = useState<InformationData>()
    const [assists, setAssists] = useState<AssistData[]>(assistsDataFake)
    const [typeForm, setTypeForm] = useState<TypesForm>("createAssist")
    const [modalVisible, setModalVisible] = useState(false)
    const [assistEdit, setAssistEdit] = useState<AssistData>({
        contractor: "Contratista",
        name: "",
        area: "",
        id: 99999,
        work: ""
    })

    const getInformation = async () => {
        if (informationId === null || informationId === undefined) {
            return
        }

        try {
            const { data } = await clientAxios(`/project/information/${informationId}`)
            const respose = informationSchema.safeParse(data)
            if (respose.success) {
                setInformation(respose.data)
            }
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                Alert.alert("Hubo un error.");
            }
        }
    }

    const getAssists = async () => {
        try {
            const { data } = await clientAxios(`/project/information/${informationId}/assist`)
            const response = assistsSchema.safeParse(data)
            if (response.success) {
                setAssists(response.data)
            }
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                Alert.alert("Hubo un error.");
            }
        }
    }

    const changeModalVisible = () => {
        setModalVisible(!modalVisible)
    }

    const handleEditInformation = () => {
        setTypeForm("editInformation")
        changeModalVisible()
    }

    const handleCreateAssist = async () => {
        setTypeForm("createAssist")
        changeModalVisible()
    }

    const handleDeleteAssist = async ( assistId: number ) => {
        try {
            const { data } = await clientAxios.delete(`/project/information/assist/${assistId}`)
            const response = assistSchema.safeParse(data)
            if (response.success) {
                const updatedAssits = assists.filter(assistState => assistState.id !== response.data.id)
                setAssists(updatedAssits)
            }else{
                Alert.alert("Algo ocurrio.")
            }
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                Alert.alert("Hubo un error.");
            }
        }
    }
    
    const handleEditAssist = ( assistEditing: AssistData ) => {
        setTypeForm("editAssist")
        setAssistEdit(assistEditing)
        changeModalVisible()
    }

    useEffect(() => {
        getInformation()
        getAssists()
    }, [informationId])

    if (!information) return <Text>Cargando...</Text>

    return (
        <View style={styles.container}>
            <Text style={styles.tittle}>Control</Text>
            {information.createdAt && (
                <Text style={styles.createdAtd}>Generado: {formatDateLabel(information.createdAt)}</Text>
            )}
            <View style={styles.containerInfo}>
                <ControlInformation information={information} />
            </View>

            <Text style={styles.tittle}>Asistencia</Text>

            <View style={styles.constainerTableNotes}>
                {assists.length > 0 ? (
                    <>
                        <View style={styles.containerLabelTableNotes}>
                            <Text style={styles.labelTable}>Nombre</Text>
                            <Text style={styles.labelTable}>Area/Trabajo</Text>
                            <Text style={styles.labelTable}>Empleado</Text>
                            <Text style={styles.labelTable}>Accciones</Text>
                        </View>
                        <ScrollView>
                            {assists.map(asssist => <AssistCard key={asssist.id} assist={asssist} handleEditAssist={handleEditAssist} handleDeleteAssist={handleDeleteAssist}/>)}
                        </ScrollView>
                    </>
                ) :
                    <Text style={{ textAlign: "center" }}>No hay registros.</Text>
                }
            </View>
            <Text style={styles.tittle}>Acciones</Text>

            <View style={styles.actionsContainer}>
                <TouchableNativeFeedback onPress={handleEditInformation}>
                    <View style={styles.actionButton}>
                        <MaterialCommunityIcons name="pencil-outline" size={24} color="#EFAD29" />
                        <Text style={{ width: "auto" }}>Editar</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={handleCreateAssist}>
                    <View style={styles.actionButton}>
                        <MaterialCommunityIcons name="account-plus-outline" size={24} color="#EFAD29" />
                        <Text style={{ width: "auto" }}>Asistencia</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>

            <ModalGeneral changeModalVisible={changeModalVisible} modalVisible={modalVisible}>
                {typeForm === 'createAssist' && (<AssistForm informationId={information.id !== undefined ? information.id : 999999} setAssists={setAssists} changeModalVisible={changeModalVisible}/>)}
                {typeForm === "editInformation" && (<InformationEditForm information={information} setInformation={setInformation} changeModalVisible={changeModalVisible}/>)}
                {typeForm === "editAssist" && (<AssistEditForm assist={assistEdit} changeModalVisible={changeModalVisible} setAssists={setAssists} assists={assists}/>)}
            </ModalGeneral>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  containerInfo: {
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
  constainerTableNotes: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingVertical: 10,
    borderRadius: 10,
    gap: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  containerLabelTableNotes: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  labelTable: {
    width: 75,
    textAlign: "center",
    fontWeight: "500",
    color: "#262829"
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
