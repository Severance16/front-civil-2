import { NoteCreate, noteToolCreateSchema, NoteTooltData, ToolData } from '@/types'
import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import NoteTypePicker from './NoteTypePicker'
import clientAxios from '@/clients/clientAxios'
import { formatDate } from '@/utils/dateParser'
import { isAxiosError } from 'axios'

type NoteFormProps = {
    toolId: number
    setNotes: React.Dispatch<React.SetStateAction<NoteTooltData[]>>
    changeModalVisible: () => void
    setTool: React.Dispatch<React.SetStateAction<ToolData | undefined>>
}

const noteInitCreate: NoteCreate = {
    date: "",
    description: "",
    quantity: "",
    type: ""
}

export default function NoteToolForm({ toolId, setNotes, changeModalVisible, setTool }: NoteFormProps) {

    const [note, setNote] = useState(noteInitCreate)
    const [load, setLoad] = useState(false)

    const changeValue = (key: keyof NoteCreate, value: string | number) => {
        setNote({
            ...note,
            [key]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            if ([note.date, note.description, note.quantity, note.type].includes("")) {
                Alert.alert("Debes llenar todos los campos.")
                return
            }
            setLoad(true)
            const { data } = await clientAxios.post(`/project/inventory/note`, {
                toolId,
                type: note.type,
                description: note.description,
                date: formatDate(note.date),
                quantity: parseFloat(note.quantity)
            })
            const response = noteToolCreateSchema.safeParse(data)
            if (response.success) {
                setNotes(prevItems => [...prevItems, response.data.note])
                setTool(response.data.tool)
                changeModalVisible()
            } else {
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
                <Text style={styles.modalText}>Registra una nota!</Text>
                <View style={styles.formContainer}>

                    <View style={styles.inputContainerSelect}>
                        <NoteTypePicker changeValue={changeValue} />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("description", e);
                            }}
                            value={note?.description}
                            placeholder="descripción"
                            keyboardType="default"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("date", e);
                            }}
                            value={note?.date}
                            placeholder="Fecha de ingreso (DD/MM/YY)"
                            keyboardType="default"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("quantity", e);
                            }}
                            value={note.quantity}
                            placeholder="Cantidad"
                            keyboardType="number-pad"
                            autoCapitalize="sentences"
                        />
                    </View>
                </View>

                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => { handleSubmit() }}
                    disabled={load}
                >
                    <Text style={styles.textStyle}>{load ? "Cargando..." : "Crear nota."}</Text>
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
