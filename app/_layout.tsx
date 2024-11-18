import { AuthProvider } from "@/contexts/authProvider";
import { ProjectProvider } from "@/contexts/projectProvider";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProjectProvider>
          <Slot />
      </ProjectProvider>
    </AuthProvider>
  );
}

// Colores:
// #EFAD29
// #FFFFFF
// #5B5B5E
// #262829
// #F1C16D
// #034A44