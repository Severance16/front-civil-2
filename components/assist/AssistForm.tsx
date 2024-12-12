import { TypesForm } from '@/app/(app)/(project)/(control)';
import clientAxios from '@/clients/clientAxios';
import { AssistData, assistSchema } from '@/types';
import { isAxiosError } from 'axios';
import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import AssistContractorPicker from './AssistContractorPicker';

type AssistFormProps = {
    informationId: number
    setAssists: React.Dispatch<React.SetStateAction<AssistData[]>>
    changeModalVisible: () => void
}

type AssistDataCreate = {
    name: string;
    area?: string
    work?: string
    contractor: string
}

const assistInit: AssistDataCreate = {
    name: "",
    area: "",
    work: "",
    contractor: ""
}

export default function AssistForm({ informationId, setAssists, changeModalVisible }: AssistFormProps) {
    const [assist, setAssist] = useState(assistInit)
    const [load, setLoad] = useState(false)

    const changeValue = (key: keyof AssistData, value: string | number) => {
        setAssist({
            ...assist,
            [key]: value,
        });
    };

    const handleSubmit = async () => {
        setLoad(true)
        try {
            if ([assist.name, assist.contractor].includes("") || !(assist.area !== "" || assist.work !== "")) {
                Alert.alert("No cumples con la informacion requerida.")
                return
            }
            const { data } = await clientAxios.post(`/project/information/${informationId}/assist`, assist)
            const response = assistSchema.safeParse(data)
            if (response.success) {
                setAssists(prevItems => [...prevItems, response.data])
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
                <Text style={styles.modalText}>Registra asistencia!</Text>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("name", e);
                            }}
                            value={assist?.name}
                            placeholder="Nombre"
                            keyboardType="default"
                            autoCapitalize="words"
                        />
                    </View>

                    <View style={styles.inputContainerSelect}>
                        <AssistContractorPicker changeValue={changeValue}/>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("area", e);
                            }}
                            value={assist?.area}
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
                            value={assist?.work}
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
                    <Text style={styles.textStyle}>{ load ? "Cargando..." : "Registrar asistencia."}</Text>
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
