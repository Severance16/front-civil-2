import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import Constants from "expo-constants";

export default function ProjectLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#F1C16D",
        headerShown: false,
        sceneStyle: {
          paddingTop: Constants.statusBarHeight,
        }
      }}
    >
      <Tabs.Screen
        name="project"
        options={{
          title: "Información",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-hard-hat"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: "Reportes",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="clipboard-list" size={24} color={ color } />
          ),
        }}
      />
      <Tabs.Screen
        name="control"
        options={{
          title: "Control",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-cog" size={24} color={ color } />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: "Inventario",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="archive" size={24} color={ color } />
          ),
        }}
      />
      <Tabs.Screen
        name="(budget)/index"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="(budget)/(item)/index"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="(report)/index"
        options={{ href: null }}
        
      />
      <Tabs.Screen
        name="(inventory)/index"
        options={{ href: null }}
        
      />
    </Tabs>
  );
}
