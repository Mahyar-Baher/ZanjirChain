import { createContext, useEffect } from "react";
import useAuthStore from "./authStore";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, wallet, orders, messages, token, fetchUserFromToken, login, logout } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchUserFromToken(token);
    }
  }, [token, fetchUserFromToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        wallet,
        orders,
        messages,
        token,
        login,
        logout,
        fetchUserFromToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};