import clientAxios from '@/clients/clientAxios'
import { SubItemData, subItemSchema } from '@/types'
import { isAxiosError } from 'axios'
import { useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

type SubItemFormProps = {
    itemId: string,
    changeModalVisible: () => void,
    setSubItems: React.Dispatch<React.SetStateAction<SubItemData[]>>
}

type SubItemDataCreate = {
    description: string
    unit: string //| null
    quantity: string //| null //Float
    amount: string //Float
    incidence: string //Float
}

const SubItemDataInit: SubItemDataCreate = {
    description: "",
    unit: "",
    quantity: "",
    amount: "",
    incidence: ""
}

export default function SubItemForm({ itemId, changeModalVisible, setSubItems }: SubItemFormProps) {
    const [subItem, setSubItem] = useState<SubItemDataCreate>(SubItemDataInit)

    const handleSubmit = async () => {
        try {
            const { description, unit, amount, incidence, quantity } = subItem
            if ([description, amount, incidence].includes("")) {
                Alert.alert("La subactividad no cumple con la información mínima obligatoria.")
                return
            }
            const { data } = await clientAxios.post(`/project/budget/item/${itemId}/subitem`, {
                description,
                unit: unit !== "" ? unit : null,
                quantity: quantity !== "" ? parseFloat(quantity) : null,
                amount: parseFloat(amount),
                incidence: parseFloat(incidence)
            })
            const response = subItemSchema.safeParse(data)
            console.log(response)
            if (response.success) {
                setSubItems((prevItems) => [...prevItems, response.data])
            } else {
                Alert.alert("Algo ocurrio.")
            }
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                Alert.alert(error.response.data.error);
            }
        }
    }

    const changeValue = (key: keyof SubItemDataCreate, value: string | number) => {
        setSubItem({
            ...subItem,
            [key]: value,
        });
    };
  return (
    <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Crea una subactividad!</Text>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("description", e);
                            }}
                            value={subItem?.description}
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
                            value={subItem?.unit}
                            placeholder="Unidad"
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
                            value={subItem?.quantity}
                            placeholder="Cantidad"
                            keyboardType="number-pad"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("amount", e);
                            }}
                            value={subItem?.amount}
                            placeholder="Presupuesto"
                            keyboardType="decimal-pad"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("incidence", e);
                            }}
                            value={subItem?.incidence}
                            placeholder="Incidencia"
                            keyboardType="decimal-pad"
                            autoCapitalize="sentences"
                        />
                    </View>


                </View>

                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => { changeModalVisible(); handleSubmit() }}>
                    <Text style={styles.textStyle}>Crear subactividad.</Text>
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
