import { ItemData } from "@/types";
import { formatCurrency } from "@/utils/currencyParser";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";

type ItemCardProps = {
  item: ItemData;
  order: number;
};


export default function ItemCard({ item, order }: ItemCardProps) {

  const handlePress = () => {
    router.push(`/(app)/(project)/(budget)/(item)?itemId=${item.id}&activity=${order}`)
  }
  return (
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.description]}>{item.description}</Text>
          </View>
          <View style={{ flex: 1, paddingRight: 20}}>
            <Text style={{ textAlign: "right"}}>N. {order}</Text>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.datagroup}>
            <Text style={styles.label}>Presupuesto</Text>
            <Text style={styles.data}>{formatCurrency(item.amount)}</Text>
          </View>

          <View style={styles.datagroup}>
            <Text style={styles.label}>Incidencia</Text>
            <Text style={styles.data}>{item.incidence} %</Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
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
    shadowRadius: 10,
    elevation: 1,
    padding: 10,
    gap: 10,
  },
  description: {
    color: "#F1C16D",
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center"
    // width: 100,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  datagroup: {
    // width: "auto"
    flex: 1,
  },
  label: {
    fontWeight: 500,
    color: "#F1C16D",
    textAlign: "center",
  },
  data: {
    textAlign: "center",
    color: "#262829",
  },
});
