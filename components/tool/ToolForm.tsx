import { InventoryType, ToolData } from '@/types';
import React from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type ToolFormProps = {
    inventoryId: number | null
    setTools: React.Dispatch<React.SetStateAction<ToolData[]>>
    changeModalVisible: () => void
}

export default function ToolForm({inventoryId, changeModalVisible, setTools}: ToolFormProps) {

    const handleSubmit = () => {
        console.log("Crear Herramienta")
    }
    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Registra una herramienta!</Text>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            // onChangeText={(e) => {
                            //     changeValue("activity", e);
                            // }}
                            // value={report?.activity}
                            placeholder="Actividad"
                            keyboardType="default"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            multiline
                            numberOfLines={5}
                            // onChangeText={(e) => {
                            //     changeValue("description", e);
                            // }}
                            // value={report?.description}
                            placeholder="Descripción"
                            keyboardType="default"
                            textAlignVertical='top'
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
