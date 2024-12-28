import clientAxios from '@/clients/clientAxios';
import { MishapData, ProgressData, ReportData, reportSchema, ReportType } from '@/types';
import { generateConsecutive } from '@/utils/consecutiveGenerator';
import { isAxiosError } from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type ReportEditFormProps = {
    reportProps: ReportData,
    type: string,
    setReport: React.Dispatch<React.SetStateAction<ReportData>>
    changeModalVisible: () => void
}



const reportDataInit: ReportData = {
    id: 0,
    activity: "",
    description: "",
    evidence: "",
    consecutive: "",
    createdAt: ""
}

export default function ReportEditForm({reportProps, type, changeModalVisible, setReport}: ReportEditFormProps) {

    const [reportEdit, setReportEdit] = useState(reportProps || reportDataInit)
    const [load, setLoad] = useState(false)

    const changeValue = (key: keyof ReportData, value: string | number) => {
        setReportEdit({
            ...reportEdit,
            [key]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            const {activity, description} = reportEdit
            if ([activity, description].includes("")) {
                Alert.alert("El item no cumple con la información mínima obligatoria.")
                return
            }
            setLoad(true)
            const { data } = await clientAxios.put(`/project/${type}/${reportProps.id}`,{
                activity,
                description,
            })
            const response = reportSchema.safeParse(data)
            if (response.success) {
                Alert.alert("Reporte actualizado.")
                setReport(response.data)
                router.navigate(`/(app)/(project)/report?type=${type}&reportId=${reportProps.id}`)
                changeModalVisible()
            }else{
                Alert.alert("Algo ocurrio.")
            }
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                Alert.alert(error.response.data.error);
              }
        } finally {
            setLoad(false)
        }
    }

  return (
    <View style={styles.centeredView}>
    <View style={styles.modalView}>
        <Text style={styles.modalText}>Editar un {type === "mishap" ? "percance" : "avance"}!</Text>
        <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => {
                        changeValue("activity", e);
                    }}
                    value={reportEdit?.activity}
                    placeholder="Actividad"
                    keyboardType="default"
                    autoCapitalize="sentences"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    multiline
                    numberOfLines={5}
                    onChangeText={(e) => {
                        changeValue("description", e);
                    }}
                    value={reportEdit?.description}
                    placeholder="Descripción"
                    keyboardType="default"
                    textAlignVertical='top'
                />
            </View>
        </View>

        <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => { changeModalVisible(); handleSubmit() }}
            disabled={load}
        >
            <Text style={styles.textStyle}>{load ? `Cargando...` : `Guardar ${type === "progress" ? "avance" : "percance"}.`}</Text>
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