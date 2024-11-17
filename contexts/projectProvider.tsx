import { createContext, ReactNode, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export interface ProjectContextProps {
  projectId: number | null;
  projectSelect: (projectId: number) => void;
}
const ProjectContext = createContext<ProjectContextProps | null>(null);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projectId, setProjectId] = useState<number | null>(null);

  const projectSelect = (projectSelected: number) => {
    setProjectId(projectSelected)
  }
  
  return (
    <ProjectContext.Provider value={{ projectId, projectSelect}}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
