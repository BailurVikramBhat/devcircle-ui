import { createContext, ReactNode, useState } from "react";

interface IAuthContextType {
  token: string | null;
  userId: string | null;
  login: (userId: string, token: string) => void;
  logout: () => void;
}
export const AuthContext = createContext<IAuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("dc_token")
  );
  const [userId, setUserId] = useState<string | null>(() =>
    localStorage.getItem("dc_userid")
  );
  const login = (id: string, jwt: string) => {
    setUserId(id);
    setToken(jwt);
    localStorage.setItem("dc_token", jwt);
    localStorage.setItem("dc_userid", id);
  };
  const logout = () => {
    setUserId(null);
    setToken(null);
    localStorage.removeItem("dc_token");
    localStorage.removeItem("dc_userid");
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
