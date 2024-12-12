import clientAxios from '@/clients/clientAxios';
import { InformationData, informationSchema } from '@/types';
import { isAxiosError } from 'axios';
import { format, formatISO, parse } from 'date-fns';
import { router } from 'expo-router';
import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type InformationEditFormProps = {
    information: InformationData
    setInformation: React.Dispatch<React.SetStateAction<InformationData | undefined>>
    changeModalVisible: () => void
}


export default function InformationEditForm({ information, setInformation, changeModalVisible }: InformationEditFormProps) {

    const [date, setDate] = useState(format(information.date, "dd/MM/yy HH:mm:ss"))
    const [load, setLoad] = useState(false)

    const handleSubmit = async () => {
        try {
            setLoad(true)
            if (date === "") {
                Alert.alert("Debes completar el campo.")
                return
            }
            const parsedDate = parse(date, "dd/MM/yy HH:mm:ss", new Date());
            const { data } = await clientAxios.put(`/project/information/${information.id}`, {date: formatISO(parsedDate)})

            const response = informationSchema.safeParse(data)
            if (response.success) {
                setInformation(response.data)
                changeModalVisible()
                router.setParams({refreshControl: Math.random()})
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
                <Text style={styles.modalText}>Registro diario!</Text>
                <View style={styles.formContainer}>

                    <View>
                        <Text>Fecha de registro</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={date}
                                placeholder="Fecha y hora"
                                keyboardType="default"
                                autoCapitalize="sentences"
                                onChangeText={(e) => {
                                    setDate(e);
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