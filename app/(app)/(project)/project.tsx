import clientAxios from "@/clients/clientAxios";
import useProject from "@/hooks/useProject";
import { ProjectData, projectsSchema } from "@/types";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";

export default function Project() {
  const { projectId } = useProject();

  const [project, setProject] = useState<ProjectData | undefined>(undefined);

  const getProject = async () => {
    try {
      const { data } = await clientAxios(`/project/${projectId}`);
      const response = projectsSchema.safeParse(data);
      console.log("hizo la consulta")
      if (response.success === true) {
        setProject(response.data);
      }else{
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
    <>
      <Text>{project.id}</Text>
      <Text>{project.name}</Text>
      <Text>{project.owner}</Text>
      <Text>{project.address}</Text>
      <Text>{project.authorizedLevels}</Text>
      <Text>{project.createdAt}</Text>
      <Text>{project.endDate}</Text>
      <Text>{project.ingResidentId}</Text>
      <Text>{project.license}</Text>
      <Text>{project.photo}</Text>
      <Text>{project.startDate}</Text>
      <Text>{project.totalArea}</Text>
      <Text>{project.workType}</Text>
    </>
  );
}
