import clientAxios from '@/clients/clientAxios';
import { InputData, inputSchema, InventoryType } from '@/types';
import { generateConsecutiveInventory } from '@/utils/consecutiveGenerator';
import { formatDate } from '@/utils/dateParser';
import { isAxiosError } from 'axios';
import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type InputFormProps = {
    inventoryId: number | null
    setInputs: React.Dispatch<React.SetStateAction<InputData[]>>
    changeModalVisible: () => void
}

type InputDataCreate = {
    numberArticle: string,
    description: string,
    unit: string,
    quantity: string, //Number
    purchaseDate: string,
    unitValue: string, //Number
}

const inputInit: InputDataCreate = {
    numberArticle: "",
    description: "",
    unit: "",
    quantity: "",
    purchaseDate: "",
    unitValue: ""
}
export default function InputForm({inventoryId, changeModalVisible, setInputs}: InputFormProps) {

    const [input, setInput] = useState<InputDataCreate>(inputInit)

    const handleSubmit = async () => {
        try {
            const { data } = await clientAxios.post(`/project/inventory/${inventoryId}/input`,{
                ...input,
                numberArticle: generateConsecutiveInventory("input"),
                quantity: parseFloat(input.quantity),
                unitValue: parseFloat(input.unitValue),
                purchaseDate: formatDate(input.purchaseDate)
            })
            const response = inputSchema.safeParse(data)
            if (response.success) {
                setInputs((prevItems) => [...prevItems, response.data])
                changeModalVisible()
            }else{
                Alert.alert("Algo Ocurrio.")
            }
        } catch (error) {
            console.log(error)
            if (isAxiosError(error) && error.response) {
                Alert.alert(error.response.data.error);
            }
        }
    }

    const changeValue = (key: keyof InputDataCreate, value: string | number) => {
        setInput({
            ...input,
            [key]: value,
        });
    };

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Registra un insumo!</Text>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("description", e);
                            }}
                            value={input?.description}
                            placeholder="Insumo"
                            keyboardType="default"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("purchaseDate", e);
                            }}
                            value={input?.purchaseDate}
                            placeholder="Fecha de compra (DD/MM/YY)"
                            keyboardType="default"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("unit", e);
                            }}
                            value={input?.unit}
                            placeholder="Unidad"
                            keyboardType="default"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("unitValue", e);
                            }}
                            value={input?.unitValue}
                            placeholder="Valor unitario"
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
                            value={input?.quantity}
                            placeholder="Cantidad"
                            keyboardType="number-pad"
                            autoCapitalize="sentences"
                        />
                    </View>
                </View>

                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => { handleSubmit() }}
                >
                    <Text style={styles.textStyle}>Crear insumo.</Text>
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
