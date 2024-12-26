import clientAxios from "@/clients/clientAxios";
import useProject from "@/hooks/useProject";
import { dashboardBudgetSchema, ProjectData, projectsSchema } from "@/types";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from 'expo-image';
import ProjectInformation from "@/components/project/ProjectInformation";
import { isAxiosError } from "axios";
import BudgetCard from "@/components/budget/BudgetCard";
import ModalGeneral from "@/components/general/ModalGeneral";
import ProjectAddColaboraborForm from "@/components/project/ProjectAddColaboratorForm";
import ProjectAddColaborator from "@/components/project/ProjectAddColaborator";

type BudgetInfo = {
  exist: boolean,
  id: number | null
}
type BudgetDashBoardDataKeys = {
  [key: string]: BudgetInfo; // Define que cualquier clave string tendrá un valor booleano
}

const initBudget: BudgetDashBoardDataKeys = {
  Inicial: { id: null, exist: false },
  Final: { id: null, exist: false },
}

export default function Project() {
  const { projectId } = useProject();

  const [project, setProject] = useState<ProjectData | undefined>(undefined);
  const [budget, setBudget] = useState<BudgetDashBoardDataKeys>(initBudget)
  const [modalVisible, setModalVisible] = useState(false)

  const getProject = async () => {
    try {
      const getProject = clientAxios(`/project/${projectId}`);
      const getBudget = clientAxios(`/project/${projectId}/budget`)
      const [projectPromise, budgetPromise] = await Promise.all([getProject, getBudget])
      const responseProject = projectsSchema.safeParse(projectPromise.data);
      if (responseProject.success === true) {
        setProject(responseProject.data);
      } else {
        setProject(undefined);
      }
      const responseBudget = dashboardBudgetSchema.safeParse(budgetPromise.data);
      if (responseBudget.success === true) {
        setBudget(responseBudget.data);
      } else {
        setBudget(initBudget);
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        Alert.alert(error.response.data.error);
      }
    }
  };

  const changeModalVisble = () => {
    setModalVisible(!modalVisible)
  }

  useEffect(() => {
    getProject();
  }, [projectId]);

  if (!project) return <View style={styles.screenLoad}><ActivityIndicator size="large" color="#EFAD29" /></View>

  return (
    <>
      <ScrollView style={{ flex: 1, paddingTop: 5 }}>
        <View style={styles.container}>
          <Text style={styles.projectName}>{project.name}</Text>
          <View style={styles.containerImage}>
            <Image style={styles.image} source={`${process.env.EXPO_PUBLIC_SERVER}/statics/${project.photo}`} alt="Imagen proyecto" />
          </View>
          <Text style={styles.tittle}>Información base</Text>
          <View style={styles.containerInfo}>
            <ProjectInformation project={project} />
          </View>
            {project.isIngResident && (<ProjectAddColaborator changeModalVisible={changeModalVisble}/>)}
          <Text style={styles.tittle}>Presupuestos</Text>
          <View style={styles.containerBudget}>
            {Object.keys(budget).map((budgetState, index) => (
              <BudgetCard key={index} type={budgetState} exist={budget[budgetState].exist} budgetId={budget[budgetState].id} />
            ))}
          </View>
        </View>
      </ScrollView>
      <ModalGeneral changeModalVisible={changeModalVisble} modalVisible={modalVisible} >
        <ProjectAddColaboraborForm changeModalVisible={changeModalVisble}/>
      </ModalGeneral>
    </>
  );
}

const styles = StyleSheet.create({
  screenLoad: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
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
    paddingTop: 10,
    paddingBottom: 20,
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
  },
  containerBudget: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
})