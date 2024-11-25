import { ProjectData } from '@/types'
import { formatDateLabel } from '@/utils/dateParser'
import { IconDictonary } from '@/utils/iconDictonary'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface ProjectInformationProps {
    project: ProjectData
}

export default function ProjectInformation({ project }: ProjectInformationProps) {
    return (
        <View style={styles.conatiner}>
            <View style={styles.rowGroup}>
                <View style={{ width: "50%" }}>
                    <Text style={styles.label}>Id </Text>
                    <Text style={styles.info}>{project.id}</Text>
                </View>
                <View style={{ width: 100 }}>
                    <Text style={[styles.label, styles.alingRight]}>Proyecto</Text>
                    <MaterialCommunityIcons style={styles.alingRight} name={IconDictonary(project.workType)} size={26} color="#034A44" />
                    <Text style={[styles.info, styles.alingRight]}>{project.workType}</Text>
                </View>
            </View>
            <View style={{ width: "100%" }}>
                <Text style={[styles.label, styles.alingRight]}>Propietario</Text>
                <Text style={[styles.info, styles.alingRight]}>{project.owner}</Text>
            </View>
            <View style={styles.rowGroup}>
                <View style={{ width: "75%" }}>
                    <Text style={[styles.label]}>Dirección</Text>
                    <Text style={[styles.info,]}>{project.address}</Text>
                </View>
                {project.authorizedLevels > 0 && (
                    <View style={{ width: "25%" }}>
                        <Text style={styles.label}>Niveles</Text>
                        <Text style={styles.info}>{project.authorizedLevels}</Text>
                    </View>
                )
                }
            </View>

            <View style={styles.rowGroup}>
                <View style={styles.dataGroup}>
                    <Text style={styles.label}>Finalizacion estimada:</Text>
                    <Text style={styles.info}>{formatDateLabel(project.endDate)}</Text>
                </View>
                <View style={styles.dataGroup}>
                    <Text style={styles.label}>Inicio de obra</Text>
                    <Text style={styles.info}>{formatDateLabel(project.startDate)}</Text>
                </View>
            </View>

            <View>
                <Text style={styles.label}>Ing. Residente</Text>
                <Text style={styles.info}>{project.ingResidentId}</Text>
            </View>
            <View>
                <Text style={styles.label}>N. licencia</Text>
                <Text style={styles.info}>{project.license}</Text>
            </View>

            {project.totalArea && (
                <View>
                    <Text style={styles.label}>Area construida</Text>
                    <Text style={styles.info}>{project.totalArea}</Text>
                </View>
            )}
            <View>
                <Text style={styles.label}>Creacion:</Text>
                <Text style={styles.info}>{formatDateLabel(project.createdAt)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: "#FFF",
        padding: 10,
        flex: 1,
        width: "100%",
    },
    rowGroup: {
        flexDirection: "row",
        justifyContent: "space-between", // Distribuir espacio entre columnas
        alignItems: "center",        // Alinear elementos al inicio verticalmente
        marginBottom: 10,
    },
    dataGroup: {
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "red", // Borde para ver la distribución
    },
    label: {
        color: "#444",                  // Estilo del texto
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 4,
    },
    info: {
        color: "#000",
        fontSize: 14,
        // textAlign: "center"
    },
    alingRight: {
        textAlign: "center"
    }
});
