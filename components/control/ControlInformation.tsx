import { InformationData } from '@/types'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { format } from 'date-fns'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type ControlInformationProps = {
    information: InformationData
}

export default function ControlInformation({information}: ControlInformationProps) {
  return (
    <>
            <View style={styles.headerContainer}>
                <View style={styles.dataContainer}>
                    <Text style={styles.label}>Identificador</Text>
                    <Text style={styles.dataTool}>{information.id}</Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={[styles.label, { fontSize: 12, }]}>Tiempo</Text>
                    <Text style={{ color: "#262829", textAlign: "center" }}>{information.time}</Text>
                </View>
            </View>

            <View>
                <Text style={styles.label}>Fecha y hora</Text>
                <Text style={[styles.dataFirts, { fontSize: 20 }]}>{format(information.date, "dd/MM/yyyy hh:MM:ss")}</Text>
            </View>

            <View style={styles.rowGroup}>
                <View style={styles.dataContainer}>
                    <Text style={styles.label}>Humedad</Text>
                    <Text style={styles.dataTool}>{information.humidity}</Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.label}>Precipitacion</Text>
                    <Text style={styles.dataTool}>{information.precipitation}</Text>
                </View>
            </View>

            <View style={styles.rowGroup}>
                <View style={styles.dataContainer}>
                    <Text style={styles.label}>Viento</Text>
                    <Text style={styles.dataTool}>{information.wind}</Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.label}>Temperatura</Text>
                    <Text style={styles.dataTool}>{information.temperature}</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    rowGroup: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    label: {
        fontWeight: 500,
        color: "#F1C16D",
        textAlign: "center"
    },
    dataTool: {
        textAlign: "center",
        color: "#262829"
    },
    dataContainer: {
        alignItems: "center",
        width: 100
    },
    dataFirts: {
        textAlign: "center",
        fontWeight: "500",
        // fontSize: 20,
        color: "#262829"
    }
})
