import clientAxios from '@/clients/clientAxios';
import { AssistData, assistSchema } from '@/types';
import { isAxiosError } from 'axios';
import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import AssistContractorPicker from './AssistContractorPicker';

type AssistEditFormProps = {
    assist: AssistData 
    changeModalVisible: () => void
    setAssists: React.Dispatch<React.SetStateAction<AssistData[]>>
    assists: AssistData[]
}

export default function AssistEditForm({ assist, changeModalVisible, setAssists, assists }: AssistEditFormProps) {
    
    const [assistEdit, setAssistEdit] = useState(assist)
    const [load, setLoad] = useState(false)

    const changeValue = (key: keyof AssistData, value: string | number) => {
        setAssistEdit({
            ...assistEdit,
            [key]: value,
        });
    };

    const handleSubmit = async () => {
        setLoad(true)
        try {
            const {name, contractor, area, work} = assistEdit
            if ([name, contractor].includes("") || !(area !== "" || work !== "")) {
                Alert.alert("No cumples con la informacion requerida.")
                return
            }
            const { data } = await clientAxios.put(`/project/information/assist/${assist.id}`, {
                name, 
                contractor, 
                area, 
                work
            })
            const response = assistSchema.safeParse(data)
            if (response.success) {
                const updatedAssist = assists.map(assistState => {
                    if (assistState.id === response.data.id) {
                        return response.data
                    }else{
                        return assist
                    }
                })
                setAssists(updatedAssist)
                changeModalVisible()
            }else{
                Alert.alert("Algo sucedio.")
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
                <Text style={styles.modalText}>Actualizar asistencia!</Text>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("name", e);
                            }}
                            value={assistEdit?.name}
                            placeholder="Nombre"
                            keyboardType="default"
                            autoCapitalize="words"
                        />
                    </View>

                    <View style={styles.inputContainerSelect}>
                        <AssistContractorPicker changeValue={changeValue} value={assistEdit.contractor}/>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("area", e);
                            }}
                            value={assistEdit?.area}
                            placeholder="Area"
                            keyboardType="default"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("work", e);
                            }}
                            value={assistEdit?.work}
                            placeholder="Trabajo"
                            keyboardType="default"
                            autoCapitalize="sentences"
                        />
                    </View>
                </View>

                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => { handleSubmit() }}
                    disabled={load}
                >
                    <Text style={styles.textStyle}>{ load ? "Cargando..." : "Guardar asistencia."}</Text>
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
