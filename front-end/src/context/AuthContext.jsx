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
    if (!token) return;

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.timeout = 10000;

      const t0 = Date.now();
      const response = await axios.post("https://amirrezaei2002x.shop/laravel/api/check-token-api");
      const t1 = Date.now();
      console.log(`⏱ زمان پاسخ API: ${t1 - t0}ms`);

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
      console.error("🚨 خطای API:", err?.response?.data || err.message);
      localStorage.removeItem("token");
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // ⚡ فقط اگر token وجود داشته باشه، درخواست می‌زنیم
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserFromToken(token);
    }
  }, []);

  const logout = () => {
    setUser(null);
    setWallet(null);
    setOrders(null);
    setMessages(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('wallet');
    localStorage.removeItem('orders');
    localStorage.removeItem('messages');
    localStorage.removeItem('phone');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        wallet,
        orders,
        messages,
        setUser,
        setWallet,
        logout,
        fetchUserFromToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
