import useAuth from "@/hooks/useAuth";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

export default function Index() {
  const { signOut } = useAuth();
  return (
    <>
    <StatusBar style="dark"/>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          onPress={async () => {
            await signOut();
          }}
        >
          Sign Out
        </Text>
      </View>
    </>
  );
}
