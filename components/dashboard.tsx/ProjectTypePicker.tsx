import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

const items = [
    { label: "Residencial", value: "Residencial" },
    { label: "Institucional", value: "Institucional" },
    { label: "Urbana", value: "Urbana" },
    { label: "Comercial", value: "Comercial" },
    { label: "Industrial", value: "Industrial" },
    { label: "Vial", value: "Vial" },
    { label: "Hidrahulica", value: "Hidrahulica" },
]
export default function ProjectTypePicker() {
    const [valor, setValor] = useState("")
    return (
        <RNPickerSelect
            placeholder={{
                label: "Selecciona un tipo",
                value: null,
                color: "#F1C16D",
                inputLabel: "Tipo"
            }}
            value={valor}
            style={stylesPicker}
            useNativeAndroidPickerStyle={false}
            onValueChange={(value) => setValor(value)}
            items={items}
            Icon={() => (<View>
                <MaterialCommunityIcons
                    name="chevron-down"
                    size={20}
                    color="#EFAD29"
                />
            </View>)}
        />
    )
}

const stylesPicker = StyleSheet.create({
    inputAndroid: {
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 15,
        paddingVertical: 3,
        paddingLeft: 8,
        color: '#262829'
    }
})
