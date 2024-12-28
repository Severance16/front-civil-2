import { Alert, Pressable, StyleSheet, TextInput } from 'react-native'
import { Text, View } from 'react-native'
import ProjectTypePicker from './ProjectTypePicker';
import { createProjectSchema, DashBoardProject } from '@/types';
import { useState } from 'react';
import clientAxios from '@/clients/clientAxios';
import { isAxiosError } from 'axios';
import { formatDate } from '@/utils/dateParser';

interface ProjectFormProps {
    changeModalVisible: () => void
    setProjectsDashBoard: React.Dispatch<React.SetStateAction<DashBoardProject[]>>
}
export interface ProjectCreate {
    address: string
    authorizedLevels: number | null
    endDate: string
    license: string
    name: string
    owner: string
    photo: string
    startDate: string
    totalArea: string
    workType: "Residencial" |
    "Institucional" |
    "Urbana" |
    "Comercial" |
    "Industrial" |
    "Vial" |
    "Hidraulica" | null
}

export default function ProjectForm({ changeModalVisible, setProjectsDashBoard }: ProjectFormProps) {

    const [project, setProject] = useState<ProjectCreate>({
        address: "",
        authorizedLevels: null,
        endDate: "",
        license: "",
        name: "",
        owner: "",
        photo: "const.jpg",
        startDate: "",
        totalArea: "",
        workType: null
    })
    const [load, setLoad] = useState(false)

    const handleSubmit = async () => {
        try {
            const { name, owner, license, address, workType, startDate } = project
            if ([name, owner, license, address, startDate].includes("") || !workType) {
                Alert.alert("El projecto no cumple con la información mínima obligatoria.")
                return
            }
            const startDateFormated = formatDate(project.startDate)
            let endDateFormated = null
            if (project.endDate !== "") {
                endDateFormated = formatDate(project.endDate)
            }
            setLoad(true)
            const { data } = await clientAxios.post("/project", {
                ...project,
                startDate: startDateFormated,
                endDate: endDateFormated
            })
            const response = createProjectSchema.safeParse(data)
            if (response.success) {
                const budgetInicial = clientAxios.post(`project/${response.data.id}/budget`, { type: "Inicial" })
                const budgetFinal = clientAxios.post(`project/${response.data.id}/budget`, { type: "Final" })
                const inventoryCreate = clientAxios.post(`project/${response.data.id}/inventory`)
                await Promise.all([budgetInicial, budgetFinal, inventoryCreate])
                setProjectsDashBoard((prevItems) => [...prevItems, response.data])
                changeModalVisible()
            } else {
                Alert.alert("Algo ocurrio.")
            }
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                Alert.alert(error.response.data.error);
            }
        } finally {
            setLoad(false)
        }
    }

    const changeValue = (key: keyof ProjectCreate, value: string | number) => {
        setProject({
            ...project,
            [key]: value,
        });
    };

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Crea un proyecto!</Text>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("name", e);
                            }}
                            value={project?.name}
                            placeholder="Nombre"
                            keyboardType="default"
                            autoCapitalize="sentences"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("owner", e);
                            }}
                            value={project?.owner}
                            placeholder="Propietario"
                            keyboardType="default"
                            autoCapitalize="sentences"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("license", e);
                            }}
                            value={project?.license}
                            placeholder="Licencia"
                            keyboardType="default"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("address", e);
                            }}
                            value={project?.address}
                            placeholder="Direccion"
                            keyboardType="default"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("totalArea", e);
                            }}
                            value={project?.totalArea}
                            placeholder="Area"
                            keyboardType="default"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("authorizedLevels", +e);
                            }}
                            value={(project?.authorizedLevels)?.toString()}
                            placeholder="Niveles"
                            keyboardType="number-pad"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={styles.inputContainerSelect}>
                        <ProjectTypePicker changeValue={changeValue} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("startDate", e);
                            }}
                            value={project?.startDate}
                            placeholder="Inicio (DD/MM/YY)"
                            keyboardType="default"
                            autoCapitalize="sentences"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            textContentType='birthdate'
                            style={styles.input}
                            onChangeText={(e) => {
                                changeValue("endDate", e);
                            }}
                            value={project?.endDate}
                            placeholder="Fin (DD/MM/YY)"
                            // keyboardType="default"
                            autoCapitalize="sentences"
                        />
                    </View>
                </View>

                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => { handleSubmit() }}
                    disabled={load}
                >
                    <Text style={styles.textStyle}>{load ? "Cargando..." : "Crear proyecto."}</Text>
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


