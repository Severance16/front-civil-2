import { ToolData } from '@/types'
import { formatCurrency } from '@/utils/currencyParser'
import { formatDateLabel } from '@/utils/dateParser'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type ToolInformation = {
  tool: ToolData
}
export default function ToolInformation({ tool }: ToolInformation) {
  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.dataContainer}>
          <Text style={styles.label}>N. articulo</Text>
          <Text style={styles.dataTool}>{tool.numberArticle}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={[styles.label, { fontSize: 12, }]}>Tipo</Text>
          <MaterialCommunityIcons name="toolbox-outline" size={16} color="#034A44" />
          <Text style={{ color: "#262829" }}>Herramienta</Text>
        </View>
      </View>

      <View style={styles.dataContainer}>
        <Text style={styles.label}>Herramienta</Text>
        <Text style={[styles.dataFirts, {fontSize: 20}]}>{tool.description}</Text>
      </View>

      <View style={styles.rowGroup}>
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Fecha de compra</Text>
          <Text style={styles.dataTool}>{formatDateLabel(tool.purchaseDate)}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Tiempo en servicio</Text>
          <Text style={styles.dataTool}>{tool.serviceTime}</Text>
        </View>
      </View>

      <View style={styles.dataContainer}>
        <Text style={styles.label}>Lugar</Text>
        <Text style={styles.dataFirts}>{tool.place}</Text>
      </View>



      <View style={styles.rowGroup}>
        <View  style={styles.dataContainer}>
          <Text style={styles.label}>Valor unitario</Text>
          <Text style={styles.dataTool}>{formatCurrency(tool.unitValue)}</Text>
        </View>

        <View style={styles.dataContainer}>
          <Text style={styles.label}>Cantidad</Text>
          <Text style={styles.dataTool}>{tool.quantity}</Text>
        </View>
      </View>


      <View style={styles.dataContainer}>
        <Text style={styles.label}>Valor total</Text>
        <Text style={styles.dataFirts}>{formatCurrency(tool.unitValue * tool.quantity)}</Text>
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
