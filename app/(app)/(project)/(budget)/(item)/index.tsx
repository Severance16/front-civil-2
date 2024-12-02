import clientAxios from "@/clients/clientAxios";
import { isAxiosError } from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text } from "react-native";

export default function index() {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const [item, setItem] = useState({});

  const getItem = async () => {
    if (!itemId) {
      return;
    }
    try {
      const { data } = await clientAxios(`/project/budget/item/${itemId}`);
      setItem(data);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        Alert.alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    getItem();
  }, [itemId]);
  return <Text>item</Text>;
}
