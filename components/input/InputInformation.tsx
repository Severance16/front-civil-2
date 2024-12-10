import { InputData } from '@/types'
import { formatCurrency } from '@/utils/currencyParser'
import { formatDateLabel } from '@/utils/dateParser'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type InputInformationProps = {
    input: InputData
}

export default function InputInformation({ input }: InputInformationProps) {
    return (
        <>
            <View style={styles.headerContainer}>
                <View style={styles.dataContainer}>
                    <Text style={styles.label}>N. articulo</Text>
                    <Text style={styles.dataTool}>{input.numberArticle}</Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={[styles.label, { fontSize: 12, }]}>Tipo</Text>
                    <MaterialCommunityIcons name="basket-outline" size={16} color="#034A44" />
                    <Text style={{ color: "#262829" }}>Insumo</Text>
                </View>
            </View>

            <View style={styles.dataContainer}>
                <Text style={styles.label}>Insumo</Text>
                <Text style={[styles.dataFirts, { fontSize: 20 }]}>{input.description}</Text>
            </View>

            <View style={styles.rowGroup}>
                <View style={styles.dataContainer}>
                    <Text style={styles.label}>Fecha de compra</Text>
                    <Text style={styles.dataTool}>{formatDateLabel(input.purchaseDate)}</Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.label}>Unidad</Text>
                    <Text style={styles.dataTool}>{input.unit}</Text>
                </View>
            </View>

            {/* <View style={styles.dataContainer}>
                <Text style={styles.label}>Lugar</Text>
                <Text style={styles.dataFirts}>{input.place}</Text>
            </View> */}



            <View style={styles.rowGroup}>
                <View style={styles.dataContainer}>
                    <Text style={styles.label}>Valor unitario</Text>
                    <Text style={styles.dataTool}>{formatCurrency(input.unitValue)}</Text>
                </View>

                <View style={styles.dataContainer}>
                    <Text style={styles.label}>Cantidad</Text>
                    <Text style={styles.dataTool}>{input.quantity}</Text>
                </View>
            </View>


            <View style={styles.dataContainer}>
                <Text style={styles.label}>Valor total</Text>
                <Text style={styles.dataFirts}>{formatCurrency(input.unitValue * input.quantity)}</Text>
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
        alignItems: "center"
    },
    dataFirts: {
        textAlign: "center",
        fontWeight: "500",
        // fontSize: 20,
        color: "#262829"
    }
})
