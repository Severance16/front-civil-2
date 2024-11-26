import clientAxios from "@/clients/clientAxios";
import useProject from "@/hooks/useProject";
import { ProjectData, projectsSchema } from "@/types";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from 'expo-image';
import ProjectInformation from "@/components/project/ProjectInformation";
import ProjectBudgetCard from "@/components/project/ProjectBudgetCard";

export default function Project() {
  const { projectId } = useProject();

  const [project, setProject] = useState<ProjectData | undefined>(undefined);

  const getProject = async () => {
    try {
      const { data } = await clientAxios(`/project/${projectId}`);
      const response = projectsSchema.safeParse(data);
      if (response.success === true) {
        setProject(response.data);
      } else {
        setProject(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProject();
  }, [projectId]);

  if (!project) return <Text>Cargango...</Text>

  return (
    <ScrollView style={{ flex: 1, paddingTop: 5 }}>
      <View style={styles.container}>
        <Text style={styles.projectName}>{project.name}</Text>
        <View style={styles.containerImage}>
          <Image style={styles.image} source={`http://192.168.1.135:4000/statics/${project.photo}`} alt="Imagen proyecto" />
        </View>
        <Text style={styles.tittle}>Información base</Text>
        <View style={styles.containerInfo}>
          <ProjectInformation project={project} />
        </View>
        <Text style={styles.tittle}>Presupuestos</Text>
          <ProjectBudgetCard />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 10,
    paddingTop: 10
  },
  containerImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 5
  },
  image: {
    flex: 1,
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: '#0553',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,
  },
  projectName: {
    fontSize: 28,
    fontWeight: "900",
    color: "#EFAD29",
    textAlign: "center"
  },
  containerInfo: {
    gap: 5,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
    width: "100%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  tittle: {
    textAlign: "center", 
    fontSize: 24, 
    color: "#EFAD29", 
    fontWeight: 500, 
    marginTop: 5
  }
})