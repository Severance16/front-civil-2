import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function ProjectLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="project"
        options={{
          title: "Projecto",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-hard-hat" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen name="budget" />
    </Tabs>
  );
}
