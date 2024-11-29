import React from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

interface BudgetFormProps {
    changeModalVisible: () => void
    // setProjectsDashBoard: React.Dispatch<React.SetStateAction<DashBoardProject[]>>
}
export default function BudgetForm({changeModalVisible}: BudgetFormProps) {

    const handleSubmit = async () => {
        console.log("Creado item")
    }
    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Crea un proyecto!</Text>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            // onChangeText={(e) => {
                            //     changeValue("name", e);
                            // }}
                            // value={project?.name}
                            placeholder="Nombre"
                            keyboardType="default"
                            autoCapitalize="sentences"
                        />
                    </View>

                </View>

                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => { changeModalVisible(); handleSubmit() }}>
                    <Text style={styles.textStyle}>Crear proyecto.</Text>
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