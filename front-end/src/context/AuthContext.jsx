// context/AuthContext.js
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post("https://amirrezaei2002x.shop/laravel/api/chektoken", { token })
        .then((response) => {
          if (response.data.success) {
            setUser(response.data.users);
            setWallet(response.data.wallet);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("wallet", JSON.stringify(response.data.wallet));
            localStorage.setItem("phone", response.data.user?.mobile_number || '');
          } else {
            console.warn("❌ توکن معتبر نیست یا منقضی شده.");
          }
        })
        .catch((err) => {
          console.error("🚨 خطا در بررسی توکن:", err);
        });
    } else {
      console.log("⛔️ توکنی یافت نشد.");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, wallet, setUser, setWallet }}>
      {children}
    </AuthContext.Provider>
  );
};
