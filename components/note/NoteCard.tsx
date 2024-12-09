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
            <Text style={styles.label}>{formatDateLabel(note.date)}</Text>
            <Text style={styles.label}>{note.quantity}</Text>
            <View style={{ flexDirection: "row", width: 100, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ textAlign: "center", color: "#262829" }}>{note.type}</Text>
                <MaterialCommunityIcons name={note.type === "Ingreso" ? "arrow-up" : "arrow-down"} size={10} color={note.type === "Ingreso" ? "#034A44" : "#f78989"} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        borderBottomWidth: 0.2,
        borderColor: "#f0f0f0",
        paddingTop: 1,
        marginBottom: 1
    },
    label: {
        width: 100,
        textAlign: "center",
        color: "#262829"
    }
})
