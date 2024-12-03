import clientAxios from "@/clients/clientAxios";
import FloatButton from "@/components/general/FloatButton";
import ModalGeneral from "@/components/general/ModalGeneral";
import SubItemCard from "@/components/subitem/SubItemCard";
import SubItemForm from "@/components/subitem/SubItemForm";
import { ItemData, itemSchema, SubItemData, subItemsSchema } from "@/types";
import { isAxiosError } from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

export default function index() {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const [item, setItem] = useState<ItemData>({id: 0, description: "", amount: 0, incidence: 0})
  const [subItems, setSubItems] = useState<SubItemData[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getSubItems = async () => {
    if (!itemId) {
      return;
    }
    try {
      const requestItem = clientAxios(`/project/budget/item/${itemId}`);
      const requestSubItems = clientAxios(`/project/budget/item/${itemId}/subitem`);
      const [getItem, getSubItems] = await Promise.all([requestItem, requestSubItems])
      const responseItem = itemSchema.safeParse(getItem.data)
      if (responseItem.success) {
        setItem(responseItem.data)
      }
      const responseSubItem = subItemsSchema.safeParse(getSubItems.data);
      if (responseSubItem.success) {
        setSubItems(responseSubItem.data);
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        Alert.alert(error.response.data.error);
      }
    }
  };

  const changeModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    getSubItems();
  }, [itemId]);
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.tittle}>{item.description}</Text>
      <View style= {styles.divider}></View>
      <Text style={styles.tittle}>Subactividades</Text>
      <Text style={styles.textInfoProjects}>
        {subItems.length === 0
          ? "No tienes ninguna aún definida."
          : "Aquí tienes la lista."}
      </Text>
      <ScrollView style={{marginTop: 10}}>
        <View style={{ flex: 1, gap: 10}}>
          {subItems.map((subItem, index) => (
            <SubItemCard key={subItem.id} subItem={subItem} order={index}/>
          ))}
        </View>
      </ScrollView>
      <ModalGeneral
        modalVisible={modalVisible}
        changeModalVisible={changeModalVisible}
      >
        <SubItemForm
          itemId={itemId}
          changeModalVisible={changeModalVisible}
          setSubItems={setSubItems}
        />
      </ModalGeneral>
      <FloatButton handlePress={changeModalVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 0.5, 
    backgroundColor: "#5B5B5E", 
    marginBottom: 15, 
    marginTop:10, 
    marginHorizontal: 15 
  },
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
