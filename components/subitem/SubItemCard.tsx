import { ItemData, SubItemData } from "@/types";
import { formatCurrency } from "@/utils/currencyParser";
import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";

type SubItemCardProps = {
  subItem: SubItemData;
  order: number;
  activityOrder: string;
};


export default function SubItemCard({ subItem, order, activityOrder }: SubItemCardProps) {

  return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.description]}>{subItem.description}</Text>
          </View>
          <View style={{ width:70, paddingRight: 20}}>
            <Text style={{ textAlign: "right"}}>N. {`${activityOrder}.${order + 1}`}</Text>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.datagroup}>
            <Text style={styles.label}>Valor Unitario</Text>
            <Text style={styles.data}>{formatCurrency(subItem.amount)}</Text>
          </View>

          <View style={styles.datagroup}>
            <Text style={styles.label}>Incidencia</Text>
            <Text style={styles.data}>{subItem.incidence} %</Text>
          </View>
        </View>
        

        <View style={styles.rowContainer}>
          {subItem.quantity && (
            <View style={styles.datagroup}>
              <Text style={styles.label}>Cantidad</Text>
              <Text style={styles.data}>{subItem.quantity}</Text>
            </View>
          )}

          {subItem.unit && (
            <View style={styles.datagroup}>
              <Text style={styles.label}>Unidad</Text>
              <Text style={styles.data}>{subItem.unit}</Text>
            </View>
          )}
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.datagroup}>
              <Text style={styles.label}>Valor total</Text>
              <Text style={styles.data}>{subItem.quantity !== null && formatCurrency(subItem.quantity * subItem.amount)}</Text>
            </View>
        </View>
      </View>
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
    fontSize: 17,
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
