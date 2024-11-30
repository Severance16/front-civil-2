import { useRouter } from 'expo-router'
import { Text, TouchableOpacity } from 'react-native'

export default function RegisterToLogin() {
    const router = useRouter()

    const navigateToLogin = () => {
        router.replace("/login")
    }
    return (
        <TouchableOpacity onPress={navigateToLogin}>
            <Text style={{ color: "#5B5B5E" }}>Inicia sesión</Text>
        </TouchableOpacity>
    )
}
