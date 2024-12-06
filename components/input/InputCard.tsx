import { InputData, InventoryType } from '@/types'
import React from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'

type InputCardProps = {
  input: InputData
}
export default function InputCard({ input }: InputCardProps) {
  return (
    <TouchableNativeFeedback>
      <View style={styles.container}>
        <View style={styles.rowGroup}>
          <Text style={styles.textHeader}>{input.numberArticle}</Text>
          <Text style={styles.textHeader}>CreatedAt</Text>
        </View>
        <Text style={styles.description}>{input.description}</Text>

        <View style={styles.rowGroupItems}>
          <View>
            <Text style={styles.label}>Unidad</Text>
            <Text style={styles.info}>{input.unit}</Text>
          </View>

          <View>
            <Text style={styles.label}>Cantidad</Text>
            <Text style={styles.info}>{input.quantity}</Text>
          </View>
        </View>

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
  description: {
    textAlign: "center",
    color: "#262829",
    fontSize: 18,
    fontWeight: 500
  },
  rowGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowGroupItems: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textHeader: {
    width: "auto",
    textAlign: 'center',
    color: "#F1C16D",
    fontWeight: 500,
    fontSize: 16
  },
  label: {
    color: "#F1C16D",
    fontWeight: 500,
    textAlign: "center"
  },
  info: {
    textAlign: "center",
    color: "#262829"
  }
})
