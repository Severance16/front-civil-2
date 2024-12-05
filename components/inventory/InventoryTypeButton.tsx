import { InventoryType } from '@/types'
import React from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
type InventoryTypeButtonProps = {
    type: InventoryType
    action: (e: InventoryType) => void
}
export default function InventoryTypeButton({type, action}: InventoryTypeButtonProps) {
  return (
    <View style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "row" }}>
            <TouchableNativeFeedback onPress={() => action("input")}>
                <View style={[style.button, { backgroundColor: type === "input" ? "#EFAD29" : "#FFF", }]}>
                    <Text style={[style.text, { color: type === "input" ? "#FFF" : "#262829" }]}>Insumos</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => action("tool")}>
                <View style={[style.button, { backgroundColor: type === "tool" ? "#EFAD29" : "#FFF", }]}>
                    <Text style={[style.text, { color: type === "tool" ? "#FFF" : "#262829" }]}>Herramientas</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
  )
}

const style = StyleSheet.create({
    button: {
        width: 120,
        paddingVertical: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    text: {
        textAlign: "center" ,
        fontWeight: 500
    }
})
