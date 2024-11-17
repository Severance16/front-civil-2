import useAuth from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";

export default function AppLayout() {
  const { session, loading } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack screenOptions={{headerShown: false}} />;
}
