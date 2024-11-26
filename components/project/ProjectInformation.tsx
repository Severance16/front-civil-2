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
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.identifierProject}>{project.id}</Text>
                <View style={styles.typeContainer}>
                    <Text style={[styles.label, { fontSize: 12, }]}>Tipo</Text>
                    <MaterialCommunityIcons name={IconDictonary(project.workType)} size={16} color="#034A44" />
                    <Text style={{ color: "#262829" }}>{project.workType}</Text>
                </View>
            </View>

            <View>
                <Text style={[styles.label, { textAlign: "center" }]}>Propietario</Text>
                <Text style={styles.dataOwnerProject}>{project.owner} Daniel Chacón Perez</Text>
            </View>

            <View style={styles.rowContainer}>
                <View style={styles.datagroup}>
                    <Text style={styles.label}>Inicio de obra</Text>
                    <Text style={styles.dataProject}>{formatDateLabel(project.startDate)}</Text>
                </View>
                {project.endDate && (
                    <View style={styles.datagroup}>
                        <Text style={styles.label}>Fin de obra</Text>
                        <Text style={styles.dataProject}>{formatDateLabel(project.endDate)}</Text>
                    </View>
                )}
            </View>

            <View style={styles.rowContainer}>
                <View style={styles.datagroup}>
                    <Text style={styles.label}>Dirección</Text>
                    <Text style={styles.dataProject}>{project.address}</Text>
                </View>
                {project.totalArea && (
                    <View style={styles.datagroup}>
                        <Text style={styles.label}>Area construida</Text>
                        <Text style={styles.dataProject}>{project.totalArea}</Text>
                    </View>
                )}
            </View>

            <View style={styles.rowContainer}>
                <View style={styles.datagroup}>
                    <Text style={styles.label}>Licencia</Text>
                    <Text style={styles.dataProject}>{project.license}</Text>
                </View>
                {project.authorizedLevels && (
                    <View style={styles.datagroup}>
                        <Text style={styles.label}>Niveles</Text>
                        <Text style={styles.dataProject}>{project.authorizedLevels}</Text>
                    </View>
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    identifierProject: {
        width: 100,
        color: "#F1C16D",
        fontSize: 24,
        fontWeight: 500
    },
    typeContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    datagroup: {
        // width: "auto"
        flex: 1
    },
    label: {
        fontWeight: 500,
        color: "#F1C16D",
        textAlign: "center"
    },
    dataProject: {
        textAlign: "center",
        color: "#262829"
    },
    dataOwnerProject: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 20,
        color: "#262829"
    }
});
