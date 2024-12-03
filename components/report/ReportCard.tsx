import { ReportData } from '@/types'
import { formatDate, formatDateLabel } from '@/utils/dateParser'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type ReportCardProps = {
    data: ReportData
}

export default function ReportCard({ data }: ReportCardProps) {
    return (
        <View style={styles.container}>
            <Text>{data.consecutive}</Text>
            <Text>{data.activity}</Text>
            <Text>{data.description}</Text>
            <Text>{formatDateLabel(data.createdAt)}</Text>
        </View>
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
        padding: 10
    }
})