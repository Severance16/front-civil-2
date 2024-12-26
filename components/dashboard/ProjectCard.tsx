import useProject from "@/hooks/useProject";
import { DashBoardProject } from "@/types";
import { IconDictonary } from "@/utils/iconDictonary";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";

type ProjectCardProps = {
  project: DashBoardProject;
};
export default function ProjectCard({ project }: ProjectCardProps) {
  const { projectSelect } = useProject();
  const handleProject = () => {
    projectSelect(project.id);
    router.push("/(app)/(project)/project");
  };
  return (
    <TouchableNativeFeedback onPress={handleProject}>
      <View style={styles.cardContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.projectName}>{project.name}</Text>
          <MaterialCommunityIcons name={IconDictonary(project.workType)} size={26} color="#034A44" />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoSection}>
            <Text style={styles.label}>Creador</Text>
            <Text style={styles.info}>{project.owner}</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.label}>Dirección</Text>
            <Text style={styles.info}>{project.address}</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.label}>Tipo</Text>
            <Text style={styles.info}>{project.workType}</Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  headerContainer:{
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  projectName: {
    color: "#F1C16D",
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  infoSection: {
    alignItems: "center",
    width: 110,
  },
  label: {
    fontSize: 12,
    color: "#5B5B5E",
  },
  info: {
    fontSize: 15,
    fontWeight: "500",
    color: "#262829",
    textAlign: "center"
  },
});
