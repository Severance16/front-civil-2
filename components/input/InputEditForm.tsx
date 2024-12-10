import clientAxios from "@/clients/clientAxios"
import { InputData, inputSchema } from "@/types"
import { isAxiosError } from "axios"
import { router } from "expo-router"
import { useState } from "react"
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native"

type InputEditFormProps = {
    input: InputData
    setInput: React.Dispatch<React.SetStateAction<InputData | undefined>>
    changeModalVisible: () => void
}

const inputDataInit: InputData = {
    id: 999999,
    // condition: "",
    createdAt: "",
    description: "",
    numberArticle: "",
    // place: "",
    purchaseDate: "",
    quantity: 0,
    // serviceTime: 0,
    unitValue: 0,
    unit: ""
}

export default function InputEditForm({ input, setInput, changeModalVisible }: InputEditFormProps) {
    const [inputEdit, setInputEdit] = useState(input || inputDataInit)
    const [load, setLoad] = useState(false)

    const changeValue = (key: keyof InputData, value: string | number) => {
        setInputEdit({
            ...inputEdit,
            [key]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            setLoad(true)
            const { data } = await clientAxios.put(`/project/inventory/input/${inputEdit.id}`, {
                description: inputEdit.description,
                unit: inputEdit.unit,
                unitValue: inputEdit.unitValue
            })
            const response = inputSchema.safeParse(data)
            if (response.success) {
                setInput(response.data)
                router.setParams({refresh: `${Math.random()}}`})
                changeModalVisible()
            }else{
                Alert.alert("Algo sucedio.")
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
                <Text style={styles.modalText}>Editar insumo!</Text>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("description", e);
                            }}
                            value={inputEdit?.description}
                            placeholder="Descripción"
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
                            value={inputEdit?.unit}
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
                            value={inputEdit?.unitValue.toString()}
                            placeholder="Valor unitario"
                            keyboardType="number-pad"
                            autoCapitalize="sentences"
                        />
                    </View>
                </View>

                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => { handleSubmit() }}
                    disabled={false}
                >
                    <Text style={styles.textStyle}>{load ? "Cargando..." : "Guardar insumo."}</Text>
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
