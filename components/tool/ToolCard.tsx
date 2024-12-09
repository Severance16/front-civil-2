import { ToolData } from '@/types'
import { formatDateLabel } from '@/utils/dateParser'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'

type ToolCardProps = {
  tool: ToolData
}

export default function ToolCard({ tool }: ToolCardProps) {

  const handlePress = () => {
    router.push(`/(app)/(project)/(inventory)/(tool)?toolId=${tool.id}`)
  }

  return (
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.rowGroup}>
          <Text style={styles.textHeader}>{tool.numberArticle}</Text>
          <Text style={styles.textHeader}>{formatDateLabel(tool.createdAt)}</Text>
        </View>
        <Text style={styles.description}>{tool.description}</Text>

        <View style={styles.rowGroupItems}>
          <View style={{width: 120}}>
            <Text style={styles.label}>Cantidad</Text>
            <Text style={styles.info}>{tool.quantity}</Text>
          </View>

          <View style={{width: 120}}>
            <Text style={styles.label}>Lugar</Text>
            <Text style={styles.info}>{tool.place}</Text>
          </View>
          
          <View style={{width: 120}}>
            <Text style={styles.label}>Condición</Text>
            <Text style={styles.info}>{tool.condition}</Text>
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