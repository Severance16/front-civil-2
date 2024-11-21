import clientAxios from "@/clients/clientAxios";
import ProjectCard from "@/components/dashboard.tsx/ProjectCard";
import ProjectForm from "@/components/dashboard.tsx/ProjectForm";
import ProjectModal from "@/components/dashboard.tsx/ProjectModal";
import FloatButton from "@/components/general/FloatButton";
import Header from "@/components/general/Header";
import { DashBoardProject, dashboardProjectSchema } from "@/types";
import { isAxiosError } from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [projects, setProjects] = useState<DashBoardProject[]>([]);
  const [modalVisible, setModalVisible] = useState(false)

  const changeModalVisible = () => {
    setModalVisible(!modalVisible)
  }

  const getProjects = async () => {
    try {
      const { data } = await clientAxios("/project");
      const response = dashboardProjectSchema.safeParse(data);

      if (response.success) {
        setProjects(response.data);
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        Alert.alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    getProjects();
  }, []);
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.containerFluid}>
        <Header />
        <View style={{ paddingVertical: 20, gap: 5 }}>
          <Text style={styles.textWelcom}>Bienvenido!</Text>
          <Text style={styles.textInfoProjects}>
            {projects.length === 0
              ? "No tienes ningun proyecto."
              : "Aquí tienes la lista de tus proyectos."}
          </Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.dashboardContainer}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </View>
        </ScrollView>
        <FloatButton handlePress={changeModalVisible} />
        <ProjectModal modalVisible={modalVisible} changeModalVisible={changeModalVisible} >
          <ProjectForm changeModalVisible={changeModalVisible} setProjectsDashBoard={setProjects} />
        </ProjectModal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerFluid: {
    flex: 1,
  },
  dashboardContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 10,
  },
  textWelcom: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "500",
    color: "#EFAD29",
  },
  textInfoProjects: {
    textAlign: "center",
    color: "#262829",
  },
});
