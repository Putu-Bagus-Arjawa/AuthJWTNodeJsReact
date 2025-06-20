import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verify = async () => {
    try {
      const respons = await fetch("http://localhost:8084/auth/verify", {
        credentials: "include",
      });
      const data = await respons.json();
      setUser(data.user);
      console.log(user)
    } catch (error) {
      console.error(error);
      setUser(null);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    verify();
  }, []);

  const logout = async () => {
    try {
      const respons = await fetch("http://localhost:8084/auth/logout", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      console.log(respons);

    } catch (error) {
      console.error(error);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading, verify }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Cara yang benar untuk expose ke komponen lain
export const useAuth = () => useContext(AuthContext);
