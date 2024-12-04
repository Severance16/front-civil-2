import { ReportData, ReportType } from '@/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type ReportInformationProps = {
    report: ReportData,
    type: string
}

export default function ReportInformation({ report, type }: ReportInformationProps) {
    const { activity, description, consecutive, createdAt } = report
    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.identifierProject}>{report.consecutive}</Text>
                <View style={styles.typeContainer}>
                    <Text style={[styles.label, { fontSize: 12, }]}>Tipo</Text>
                    <MaterialCommunityIcons name={type === "progress" ? "progress-check" : "progress-alert"} size={16} color="#034A44" />
                    <Text style={{ color: "#262829" }}>{type === "progress" ? "Avance" : "Percance"}</Text>
                </View>
            </View>
            <View>
                <Text style={[styles.label, { textAlign: "center" }]}>Actividad</Text>
                <Text style={styles.dataOwnerProject}>{activity}</Text>
            </View>
            <View>
                <Text style={styles.label}>Descripción</Text>
                <Text style={styles.dataProject}>{description}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10
    },
    identifierProject: {
        width: "auto",
        color: "#F1C16D",
        fontSize: 20,
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