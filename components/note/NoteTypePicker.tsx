import { NoteTooltData } from '@/types'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { NoteCreate } from './NoteToolForm';

const items = [
    { label: "Ingreso", value: "Ingreso" },
    { label: "Egreso", value: "Egreso" },
]

interface NoteTypePikerProps {
    changeValue: (key: keyof NoteCreate, value: string | number) => void
}

export default function NoteTypePicker({changeValue}: NoteTypePikerProps) {
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
            onValueChange={(value: string) => {changeValue("type", value); setValor(value)}}
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
