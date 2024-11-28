import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function ProjectLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="project"
        options={{
          title: "Información",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-hard-hat" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen name="report" />
      <Tabs.Screen name="control" />
      <Tabs.Screen name="inventory" />
      <Tabs.Screen
        name="(budget)/index" 
        options={{href: null, title: "Presupuesto"}}
      />
    </Tabs>
  );
}
