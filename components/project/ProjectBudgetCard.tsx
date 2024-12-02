import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StyleSheet, TouchableNativeFeedback } from 'react-native'
import { Text, View } from 'react-native'

interface ProjectBudgetCardProps {
    type: string
    exist: boolean
    budgetId: number | null
}

type IconType = "ray-start" | "ray-end" | "eye-outline"

export default function ProjectBudgetCard({ type, exist, budgetId }: ProjectBudgetCardProps) {

    const icon = (): IconType => {
        let selected: IconType = "eye-outline"
        if (!exist) {
            selected = type === "Inicial" ? "ray-start" : "ray-end"
        }
        return selected
    }
    const handleBudget = () => {
        router.push(`/(app)/(project)/(budget)?type=${type}&budgetId=${budgetId}`)
    }
    return (
        <TouchableNativeFeedback onPress={handleBudget} >
            <View style={styles.container}>
                <Text style={styles.label}>{type}</Text>
                <MaterialCommunityIcons name={icon()} size={24} color="#EFAD29" />
                <Text style={styles.action}>{!exist ? "Crear" : "Ver"}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 90,
        height: 90,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 1,
    },
    label: {
        color: "#262829",
        fontWeight: 500
    },
    action: {
        color: "#5B5B5E",
        fontSize: 12
    }
})
