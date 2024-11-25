import clientAxios from "@/clients/clientAxios";
import useProject from "@/hooks/useProject";
import { ProjectData, projectsSchema } from "@/types";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from 'expo-image';
import { formatDateLabel } from "@/utils/dateParser";
import ProjectInformation from "@/components/project/ProjectInformation";

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
        <View>
          <Text style={styles.projectName}>{project.name}</Text>
        </View>

        <View style={styles.containerImage}>
          <Image style={styles.image} source={`http://192.168.1.135:4000/statics/${project.photo}`} alt="Imagen proyecto" />
        </View>
        <View style={{flex: 1}}>

        <ProjectInformation project={project}/>
        </View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15
  },
  image: {
    flex: 1,
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: '#0553',
  },
  projectName: {
    fontSize: 28,
    fontWeight: "900",
    color: "#EFAD29",
    textAlign: "center"
  }
})