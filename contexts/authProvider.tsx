import { createContext, ReactNode, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export interface AuthContextProps {
  session: string | null;
  loading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}
const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Cargar el token almacenado al iniciar la aplicación
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      setSession(token);
      setLoading(false);
    };

    loadToken();
  }, []);

  const signIn = async (token: string) => {
    await SecureStore.setItemAsync("token", token);
    setSession(token);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("token");
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext