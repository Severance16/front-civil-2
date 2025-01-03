import clientAxios from '@/clients/clientAxios'
import { ItemData, ItemDataValor, itemSchema } from '@/types'
import { isAxiosError } from 'axios'
import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

interface ItemFormProps {
    changeModalVisible: () => void
    budgetId: string
    setItems: React.Dispatch<React.SetStateAction<ItemDataValor[]>>
}

type ItemDataCreate = {
    description: string,
    amount: string,
    incidence: string
}

const itemDataInit: ItemDataCreate = {
    description: "",
    amount: "",
    incidence: ""
}
export default function ItemForm({changeModalVisible, budgetId, setItems}: ItemFormProps) {

    const [item, setItem] = useState<ItemDataCreate>(itemDataInit)
    const [ load, setLoad ] = useState(false)

    const changeValue = (key: keyof ItemDataCreate, value: string | number) => {
        setItem({
            ...item,
            [key]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            const {description } = item
            if (description === "") {
                Alert.alert("El item no cumple con la información mínima obligatoria.")
                return
            }
            setLoad(true)
            const { data } = await clientAxios.post(`/project/budget/${budgetId}/item`,{
                description,
                amount: 0,
                incidence: 0
            })
            const response = itemSchema.safeParse(data)
            if (response.success) {
                setItems((prevItems) => [...prevItems, response.data])
                changeModalVisible()
            }else{
                Alert.alert("Algo ocurrio.")
            }
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                Alert.alert(error.response.data.error);
              }
        }finally{
            setLoad(false)
        }
    }

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Crea una actividad!</Text>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("description", e);
                            }}
                            value={item?.description}
                            placeholder="Descripción"
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
                    <Text style={styles.textStyle}>{load ? "Cargando..." : "Crear actividad."}</Text>
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