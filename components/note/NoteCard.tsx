import { InventoryType, NoteData, NoteType } from '@/types'
import { formatDateLabel } from '@/utils/dateParser'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type NoteCardProps = {
    note: NoteData
}
export default function NoteCard({ note }: NoteCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.containerGroup}>
                <Text style={styles.label}>{formatDateLabel(note.date)}</Text>
                <Text style={styles.label}>{note.quantity}</Text>
                <View style={{ flexDirection: "row", width: 100, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ textAlign: "center", color: "#262829" }}>{note.type}</Text>
                    <MaterialCommunityIcons name={note.type === "Ingreso" ? "arrow-up" : "arrow-down"} size={10} color={note.type === "Ingreso" ? "#034A44" : "#f78989"} />
                </View>
                
            </View>
            <Text style={styles.description}>{note.description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.2,
        paddingBottom: 5,
        marginTop: 5,
        // paddingTop: ,
        // marginBottom: 5,
        paddingHorizontal: 10,
        borderColor: "#e2e2e2",
        // borderColor: "#32e741",
        gap: 3
    },
    containerGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    label: {
        width: 100,
        textAlign: "center",
        color: "#262829"
    },
    description: {
        textAlign: 'center'
    }
})
