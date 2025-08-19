// src/context/AuthContext.jsx
import { createContext, useEffect } from "react";
import useAuthStore from "./authStore"; // ✅ adjust path
import { AES, enc } from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "7x!9kPzQwRtYmN2vB8jLcF5hDsA3gJpX"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, wallet, orders, messages, token, fetchUserFromToken, login, logout } =
    useAuthStore();

  useEffect(() => {
    const initialize = async () => {
      try {
        if (token) {
          await fetchUserFromToken(token);
        } else {
          // ✅ Check persisted state in localStorage
          const storedState = localStorage.getItem("auth-storage");
          if (storedState) {
            const decrypted = AES.decrypt(storedState, SECRET_KEY).toString(enc.Utf8);
            if (!decrypted) return;

            const parsedState = JSON.parse(decrypted);
            const savedToken = parsedState?.state?.token;

            if (savedToken) {
              await fetchUserFromToken(savedToken);
            }
          }
        }
      } catch (err) {
        console.error("🚨 خطای رمزگشایی در لود اولیه:", err.message);
        logout();
      }
    };

    initialize();
  }, [token, fetchUserFromToken, logout]);

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
