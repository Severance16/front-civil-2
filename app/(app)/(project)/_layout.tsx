import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function ProjectLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#F1C16D"
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
        options={{ href: null, title: "Presupuesto" }}
      />
      <Tabs.Screen
        name="(budget)/(item)/index"
        options={{ href: null, title: "Presupuesto" }}
      />
    </Tabs>
  );
}
