import { createContext, ReactNode, useContext, useState } from "react";

interface IAuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}
const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("dc_token")
  );
  const login = (jwt: string) => {
    setToken(jwt);
    localStorage.setItem("dc_token", jwt);
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem("dc_token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
