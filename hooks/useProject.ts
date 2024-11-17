import ProjectContext, { ProjectContextProps } from "@/contexts/projectProvider";
import { useContext } from "react";

const useProject = (): ProjectContextProps => {
    const context = useContext(ProjectContext)
    if (context === null) {
        throw new Error("useProject debe usarse dentro de un ProjectProvider");   
    }
    return context
}

export default useProject