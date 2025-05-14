import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      const userToken = response.data.token;
      if (typeof userToken !== 'string') {
        throw new Error('Token inválido!');
      }
      setToken(userToken);
      localStorage.setItem("token", userToken);
      return userToken;
    } catch (error) {
      console.error("Login falhou:", error);
      throw new Error("Login falhou, tente novamente.");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
