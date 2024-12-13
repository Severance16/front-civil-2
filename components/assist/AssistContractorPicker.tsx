import { AssistData } from '@/types'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const items = [
    { label: "Interno", value: "Interno" },
    { label: "Contratista", value: "Contratista" },
]

interface AssistContractorPickerPikerProps {
    changeValue: (key: keyof AssistData, value: string | number) => void
    value?: string
}

export default function AssistContractorPicker({ changeValue, value }: AssistContractorPickerPikerProps) {
    const [valor, setValor] = useState<string>(value || "")
    return (
        <RNPickerSelect
            placeholder={{
                label: "Selecciona un tipo",
                value: null,
                color: "#F1C16D",
                inputLabel: "Empleado"
            }}
            value={valor}
            style={stylesPicker}
            useNativeAndroidPickerStyle={false}
            onValueChange={(value: string) => {changeValue("contractor", value); setValor(value)}}
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

