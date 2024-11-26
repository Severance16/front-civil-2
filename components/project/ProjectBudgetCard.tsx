import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native'

export default function ProjectBudgetCard() {
    return (
        <View style={styles.container}>
            <Text>Inicial</Text>
            <MaterialCommunityIcons name="ray-start" size={24} color="black" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 80,
        backgroundColor: "#00ff0d",
        alignItems: "center",
        justifyContent: "center"
    }
})
