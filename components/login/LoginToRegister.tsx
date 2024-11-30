import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default function LoginToRegister() {
    const router = useRouter()

    const navigateToRegister = () => {
        router.replace("/register")
    }
    return (
        <TouchableOpacity onPress={navigateToRegister}>
            <Text style={{ color: "#5B5B5E" }}>Registrate</Text>
        </TouchableOpacity>
    )
}
