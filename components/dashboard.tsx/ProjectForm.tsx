import { Pressable, StyleSheet, TextInput } from 'react-native'
import { Text, View } from 'react-native'
import ProjectTypePicker from './ProjectTypePicker';

interface ProjectFormProps {
    changeModalVisible: () => void
}

export default function ProjectForm({ changeModalVisible }: ProjectFormProps) {

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Crea un proyecto!</Text>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            // onChangeText={(e) => {
                            //     changeValue("lastname", e);
                            // }}
                            // value={user?.lastname}
                            placeholder="Nombre"
                            keyboardType="default"
                            autoCapitalize="words"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            // onChangeText={(e) => {
                            //     changeValue("lastname", e);
                            // }}
                            // value={user?.lastname}
                            placeholder="Propietario"
                            keyboardType="default"
                            autoCapitalize="words"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            // onChangeText={(e) => {
                            //     changeValue("lastname", e);
                            // }}
                            // value={user?.lastname}
                            placeholder="Licencia"
                            keyboardType="default"
                            autoCapitalize="words"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            // onChangeText={(e) => {
                            //     changeValue("lastname", e);
                            // }}
                            // value={user?.lastname}
                            placeholder="Direccion"
                            keyboardType="default"
                            autoCapitalize="words"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            // onChangeText={(e) => {
                            //     changeValue("lastname", e);
                            // }}
                            // value={user?.lastname}
                            placeholder="Area"
                            keyboardType="default"
                            autoCapitalize="words"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            // onChangeText={(e) => {
                            //     changeValue("lastname", e);
                            // }}
                            // value={user?.lastname}
                            placeholder="Niveles"
                            keyboardType="default"
                            autoCapitalize="words"
                        />
                    </View>
                    <View style={styles.inputContainerSelect}>

                        <ProjectTypePicker />

                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            // onChangeText={(e) => {
                            //     changeValue("lastname", e);
                            // }}
                            // value={user?.lastname}
                            placeholder="Inicio"
                            keyboardType="default"
                            autoCapitalize="words"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            textContentType='birthdate'
                            style={styles.input}
                            // onChangeText={(e) => {
                            //     changeValue("lastname", e);
                            // }}
                            // value={user?.lastname}
                            placeholder="Fin"
                            // keyboardType="default"
                            autoCapitalize="words"
                        />
                    </View>
                </View>

                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => changeModalVisible()}>
                    <Text style={styles.textStyle}>Hide Modal</Text>
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
        backgroundColor: '#2196F3',
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


