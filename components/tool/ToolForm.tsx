import clientAxios from '@/clients/clientAxios';
import { InventoryType, ToolData, toolSchema } from '@/types';
import { generateConsecutiveInventory } from '@/utils/consecutiveGenerator';
import { formatDate } from '@/utils/dateParser';
import { isAxiosError } from 'axios';
import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type ToolFormProps = {
    inventoryId: number | null
    setTools: React.Dispatch<React.SetStateAction<ToolData[]>>
    changeModalVisible: () => void
}

type ToolDataCreate = {
    numberArticle: string
    description: string
    quantity: string //number
    place: string
    condition: string
    serviceTime: string //number
    purchaseDate: string
    unitValue: string //number
}

const toolInit: ToolDataCreate = {
    numberArticle: "",
    description: "",
    quantity: "",
    place: "",
    condition: "",
    serviceTime: "",
    purchaseDate: "",
    unitValue: ""
}

export default function ToolForm({inventoryId, changeModalVisible, setTools}: ToolFormProps) {

    const [tool, setTool] = useState<ToolDataCreate>(toolInit)
    const handleSubmit = async () => {
        try {
            const { data } = await clientAxios.post(`/project/inventory/${inventoryId}/tool`,{
                ...tool,
                numberArticle: generateConsecutiveInventory("tool"),
                purchaseDate: formatDate(tool.purchaseDate),
                quantity: parseFloat(tool.quantity),
                serviceTime: parseInt(tool.serviceTime),
                unitValue: parseFloat(tool.unitValue)
            })
            const response = toolSchema.safeParse(data)
            if (response.success) {
                setTools((prevItems) => [...prevItems, response.data])
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

    const changeValue = (key: keyof ToolDataCreate, value: string | number) => {
        setTool({
            ...tool,
            [key]: value,
        });
    };

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Registra una herramienta!</Text>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("description", e);
                            }}
                            value={tool?.description}
                            placeholder="Herramienta"
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
                            value={tool?.purchaseDate}
                            placeholder="Fecha de compra (DD/MM/YY)"
                            keyboardType="default"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("condition", e);
                            }}
                            value={tool?.condition}
                            placeholder="Condicion"
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
                            value={tool?.quantity}
                            placeholder="Cantidad"
                            keyboardType="numeric"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("serviceTime", e);
                            }}
                            value={tool?.serviceTime}
                            placeholder="Tiempo en servicio"
                            keyboardType="numeric"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("unitValue", e);
                            }}
                            value={tool?.unitValue}
                            placeholder="Valor unitario"
                            keyboardType="numeric"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("place", e);
                            }}
                            value={tool?.place}
                            placeholder="Lugar"
                            keyboardType="default"
                            autoCapitalize="sentences"
                        />
                    </View>
                </View>

                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => { changeModalVisible(); handleSubmit() }}
                >
                    <Text style={styles.textStyle}>Crear herramienta.</Text>
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
