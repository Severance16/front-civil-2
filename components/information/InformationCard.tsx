import { InformationData } from '@/types'
import { formatDateTimeLabel } from '@/utils/dateParser'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'

type InformationCardProps = {
    information: InformationData
}

export default function InformationCard({ information }: InformationCardProps) {
    const handlePress = () => {
        router.push(`/(app)/(project)/(control)?informationId=${information.id}`)
    }

    return (
        <TouchableNativeFeedback onPress={handlePress}>
            <View style={styles.container}>
                <View style={styles.rowGroup}>
                    <Text style={styles.textHeader}>{information.id}</Text>
                    <Text style={styles.textHeader}>{typeof information.date === "string" ? formatDateTimeLabel(information.date): ""}</Text>
                </View>
                <Text style={styles.description}>{information.time}</Text>

                <View style={styles.rowGroupItems}>
                    <View style={{ width: 150 }}>
                        <Text style={styles.label}>Humedad</Text>
                        <Text style={styles.info}>{information.wind}</Text>
                    </View>

                    <View style={{ width: 150 }}>
                        <Text style={styles.label}>Precipitaciones</Text>
                        <Text style={styles.info}>{information.precipitation}</Text>
                    </View>
                </View>

            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFF",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.00,
      elevation: 1,
      paddingHorizontal: 15,
      paddingVertical: 20,
      gap: 5
    },
    description: {
      textAlign: "center",
      color: "#262829",
      fontSize: 18,
      fontWeight: 500
    },
    rowGroup: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    rowGroupItems: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    textHeader: {
      width: "auto",
      textAlign: 'center',
      color: "#F1C16D",
      fontWeight: 500,
      fontSize: 16
    },
    label: {
      color: "#F1C16D",
      fontWeight: 500,
      textAlign: "center"
    },
    info: {
      textAlign: "center",
      color: "#262829"
    }
  })
  
