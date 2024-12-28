import clientAxios from '@/clients/clientAxios'
import { ToolData, toolSchema } from '@/types'
import { isAxiosError } from 'axios'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

type ToolEditFormProps = {
    tool: ToolData
    setTool: React.Dispatch<React.SetStateAction<ToolData | undefined>>
    changeModalVisible: () => void
}

const toolDataInit: ToolData = {
    id: 999999,
    condition: "",
    createdAt: "",
    description: "",
    numberArticle: "",
    place: "",
    purchaseDate: "",
    quantity: 0,
    serviceTime: 0,
    unitValue: 0
}

export default function ToolEditForm({ tool, setTool, changeModalVisible }: ToolEditFormProps) {
    const [toolEdit, setToolEdit] = useState(tool || toolDataInit)
    const [load, setLoad] = useState(false)

    const changeValue = (key: keyof ToolData, value: string | number) => {
        setToolEdit({
            ...toolEdit,
            [key]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            setLoad(true)
            const { data } = await clientAxios.put(`/project/inventory/tool/${toolEdit.id}`, {
                place: toolEdit.place === "" ? null :  toolEdit.place,
                condition: toolEdit.condition,
                description: toolEdit.description,
                serviceTime: toolEdit.serviceTime, 
                unitValue: toolEdit.unitValue
            })
            const response = toolSchema.safeParse(data)
            if (response.success) {
                setTool(response.data)
                router.setParams({refresh: `${Math.random()}}`})
                changeModalVisible()
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
                <Text style={styles.modalText}>Editar herramienta!</Text>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("description", e);
                            }}
                            value={toolEdit?.description}
                            placeholder="Descripción"
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
                                changeValue("place", e);
                            }}
                            value={toolEdit?.place === null ? "" : toolEdit?.place}
                            placeholder="Lugar"
                            keyboardType="default"
                            textAlignVertical='top'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            multiline
                            numberOfLines={5}
                            onChangeText={(e) => {
                                changeValue("condition", e);
                            }}
                            value={toolEdit?.condition}
                            placeholder="Condicion"
                            keyboardType="default"
                            textAlignVertical='top'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            multiline
                            numberOfLines={5}
                            onChangeText={(e) => {
                                changeValue("serviceTime", e);
                            }}
                            value={toolEdit?.serviceTime === null ? "" : toolEdit?.serviceTime.toString()}
                            placeholder="Vida útil estimada (meses)"
                            keyboardType="number-pad"
                            textAlignVertical='top'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            multiline
                            numberOfLines={5}
                            onChangeText={(e) => {
                                changeValue("unitValue", e);
                            }}
                            value={toolEdit?.unitValue.toString()}
                            placeholder="Valor unitario"
                            keyboardType="number-pad"
                            textAlignVertical='top'
                        />
                    </View>
                </View>

                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => { handleSubmit() }}
                    disabled={false}
                >
                    <Text style={styles.textStyle}>{load ? "Cargando..." : "Guardar herramienta."}</Text>
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