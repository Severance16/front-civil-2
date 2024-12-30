import clientAxios from "@/clients/clientAxios";
import FloatButton from "@/components/general/FloatButton";
import ModalGeneral from "@/components/general/ModalGeneral";
import ItemCard from "@/components/item/ItemCard";
import ItemForm from "@/components/item/ItemForm";
import { ItemDataValor, itemsValorsSchema } from "@/types";
import { isAxiosError } from "axios";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

export default function BudgetDashboard() {
    const params = useGlobalSearchParams<{
        budgetReset: string
    }>()
  const { budgetId } = useLocalSearchParams<{
    type: string;
    budgetId: string;
  }>();
  const [items, setItems] = useState<ItemDataValor[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getItemsBudget = async () => {
    if (budgetId !== null) {
      try {
        const { data } = await clientAxios.get(
          `/project/budget/${budgetId}/item`
        );
        const response = itemsValorsSchema.safeParse(data);
        if (response.success) {
          setItems(response.data);
        }
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          Alert.alert(error.response.data.error);
        }
      }
    }
  };

  const changeModalVisible = () => {
    setModalVisible(!modalVisible);
  };
  
  useEffect(() => {
    getItemsBudget();
  }, [budgetId, params.budgetReset]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.tittle}>Actividades</Text>
      <Text style={styles.textInfoProjects}>
        {items.length === 0
          ? "No tienes ninguna aun definida."
          : "Aquí tienes la lista."}
      </Text>
      <ScrollView style={{marginTop: 10}}>
        <View style={{ flex: 1, gap: 10}}>
          {items.map((item, index) => (
            <ItemCard key={item.id} item={item} order={index + 1}/>
          ))}
        </View>
      </ScrollView>
      <ModalGeneral
        modalVisible={modalVisible}
        changeModalVisible={changeModalVisible}
      >
        <ItemForm
          budgetId={budgetId}
          changeModalVisible={changeModalVisible}
          setItems={setItems}
        />
      </ModalGeneral>
      <FloatButton handlePress={changeModalVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  tittle: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "500",
    color: "#EFAD29",
  },
  textInfoProjects: {
    textAlign: "center",
    color: "#262829",
  },
});
