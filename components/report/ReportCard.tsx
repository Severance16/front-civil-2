import { ReportData, ReportType } from '@/types'
import { formatDateLabel } from '@/utils/dateParser'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'

type ReportCardProps = {
    data: ReportData
    type: ReportType
}

export default function ReportCard({ data, type }: ReportCardProps) {

    const handleReport = () => {
        router.push(`/(app)/(project)/(report)?type=${type}&reportId=${data.id}`)
    }
    return (
        <TouchableNativeFeedback onPress={handleReport}>
            <View style={styles.container}>
                <View style={styles.group}>
                    <Text style={styles.textHeader}>{data.consecutive}</Text>
                    <Text style={styles.textHeader}>{formatDateLabel(data.createdAt)}</Text>
                </View>
                <Text style={styles.textActivity}>{data.activity}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
        gap: 5
    },
    group: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    textHeader: {
        width: "auto",
        textAlign: 'center',
        color: "#F1C16D",
        fontWeight: 500,
        fontSize: 16
    },
    textActivity: {
        fontSize: 20,
        color: "#262829",
        textAlign: "center"
    }
})