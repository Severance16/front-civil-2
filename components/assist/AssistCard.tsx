
import { AssistData } from '@/types'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'

type AssistCardProps = {
  assist: AssistData,
  handleEditAssist: (assistEditing: AssistData) => void
  handleDeleteAssist: (assistId: number) => Promise<void>
}

export default function AssistCard({ assist, handleDeleteAssist, handleEditAssist }: AssistCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{assist.name}</Text>
      <Text style={styles.label}>{assist.work || assist.area}</Text>
      <Text style={styles.label}>{assist.contractor}</Text>
      <View style={{ flexDirection: "row", width: 75, alignItems: "center", justifyContent: "center", gap: 1 }}>
        
        <TouchableNativeFeedback onPress={() => handleEditAssist(assist)}>
          <View style={{ padding: 5 }}>
            <Text style={{ textAlign: "center", color: "#5B5B5E", fontSize: 10 }}>Editar</Text>
            <MaterialCommunityIcons name={"pencil-outline"} size={20} color={"#F1C16D"} />
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={() => handleDeleteAssist(assist.id || 999999)}>
          <View style={{ padding: 5 }}>
            <Text style={{ textAlign: "center", color: "#5B5B5E", fontSize: 10 }}>Elimar</Text>
            <MaterialCommunityIcons name={"trash-can-outline"} size={20} color={"#f78989"} />
          </View>
        </TouchableNativeFeedback>
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
    marginBottom: 1,
    alignItems: "center"
  },
  label: {
    width: 75,
    textAlign: "center",
    color: "#262829",
  }
})
