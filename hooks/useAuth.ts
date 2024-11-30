
import AuthContext, { AuthContextProps } from "@/contexts/authProvider";
import { useContext } from "react"

const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext)
    if (context === null) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");   
    }
    return context
}

export default useAuth