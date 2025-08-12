import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { AES, enc } from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "your-very-secure-secret-key-12345";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      wallet: null,
      orders: null,
      messages: null,
      token: null,

      setUser: (user) => set({ user }),
      setWallet: (wallet) => set({ wallet }),
      setOrders: (orders) => set({ orders }),
      setMessages: (messages) => set({ messages }),
      setToken: (token) => set({ token }),

      fetchUserFromToken: async (token) => {
        if (!token) {
          set({ user: null, wallet: null, orders: null, messages: null, token: null });
          delete axios.defaults.headers.common["Authorization"];
          return;
        }

        try {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          axios.defaults.timeout = 10000;

          const t0 = Date.now();
          const response = await axios.post("https://amirrezaei2002x.shop/laravel/api/check-token-api");
          const t1 = Date.now();
          console.log(`⏱ زمان پاسخ API: ${t1 - t0}ms`);

          if (response.data.success) {
            set({
              user: response.data.user,
              orders: response.data.orders ?? null,
              messages: response.data.messages,
              token,
            });
            localStorage.setItem("phone", response.data.user?.mobile_number || "");
          } else {
            set({ user: null, wallet: null, orders: null, messages: null, token: null });
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("phone");
          }
        } catch (err) {
          console.error("🚨 خطای API:", err?.response?.data || err.message);
          set({ user: null, wallet: null, orders: null, messages: null, token: null });
          delete axios.defaults.headers.common["Authorization"];
          localStorage.removeItem("phone");
        }
      },

      login: async (phone, password, session) => {
        try {
          const response = await axios.post(
            "https://amirrezaei2002x.shop/laravel/api/check-password",
            {
              mobile_number: phone,
              password: password.trim(),
              active_sessions: [session],
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.data?.success && response.data?.token) {
            const token = response.data.token;
            set({ token });
            return { success: true, token };
          } else {
            return { success: false, message: response.data?.message || "رمز عبور نادرست است." };
          }
        } catch (error) {
          return {
            success: false,
            message: error.response?.data?.message || "ارتباط با سرور برقرار نشد.",
          };
        }
      },

      logout: () => {
        set({ user: null, wallet: null, orders: null, messages: null, token: null });
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("phone");
        localStorage.removeItem("token"); // اطمینان از حذف توکن خام
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      serialize: (state) => {
        const encrypted = AES.encrypt(JSON.stringify(state), SECRET_KEY).toString();
        return encrypted;
      },
      deserialize: (str) => {
        try {
          const decrypted = AES.decrypt(str, SECRET_KEY).toString(enc.Utf8);
          return JSON.parse(decrypted);
        } catch (err) {
          console.error("🚨 خطای رمزگشایی:", err.message);
          return { state: { user: null, wallet: null, orders: null, messages: null, token: null } };
        }
      },
    }
  )
);

export default useAuthStore;