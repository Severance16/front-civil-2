import { ReportType } from "@/types";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
type ReportTypeButtonProps = {
    type: ReportType
    action: (e: ReportType) => void
}
export default function ReportTypeButton({ type, action }: ReportTypeButtonProps) {
    return (
        <View style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "row" }}>
            <TouchableNativeFeedback onPress={() => action("progress")}>
                <View style={[style.button, { backgroundColor: type === "progress" ? "#EFAD29" : "#FFF", }]}>
                    <Text style={[style.text, { color: type === "progress" ? "#FFF" : "#262829" }]}>Avances</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => action("mishap")}>
                <View style={[style.button, { backgroundColor: type === "mishap" ? "#EFAD29" : "#FFF", }]}>
                    <Text style={[style.text, { color: type === "mishap" ? "#FFF" : "#262829" }]}>Percances</Text>
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
