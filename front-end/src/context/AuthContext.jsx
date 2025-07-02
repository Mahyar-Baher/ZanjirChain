import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [orders, setOrders] = useState(null);
  const [messages, setMessages] = useState(null);

  const fetchUserFromToken = async (tokenFromParam = null) => {
    const token = tokenFromParam || localStorage.getItem('token');

    if (!token) {
      console.log("⛔️ توکن موجود نیست. کاربر وارد نشده.");
      return;
    }

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.post("https://amirrezaei2002x.shop/laravel/api/check-token-api");

      if (response.data.success) {
        const user = response.data.user;
        const wallet = response.data.wallet ?? null;
        const messages = response.data.messages;
        const orders = response.data.orders ?? null;

        setUser(user);
        setWallet(wallet);
        setOrders(orders);
        setMessages(messages);

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("wallet", JSON.stringify(wallet));
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.setItem("messages", JSON.stringify(messages));
        localStorage.setItem("phone", user?.mobile_number || "");
      } else {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common['Authorization'];
      }
    } catch (err) {
      console.error("🚨 خطا در دریافت اطلاعات کاربر:", err?.response?.data || err.message);
      localStorage.removeItem("token");
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  useEffect(() => {
    fetchUserFromToken();
  }, []);

  const logout = () => {
    setUser(null);
    setWallet(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('wallet');
    localStorage.removeItem('phone');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, wallet, setUser, setWallet, logout, fetchUserFromToken }}>
      {children}
    </AuthContext.Provider>
  );
};
