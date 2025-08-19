import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { AES, enc } from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "7x!9kPzQwRtYmN2vB8jLcF5hDsA3gJpX";

const useAuthStore = create(
  persist(
    (set, get) => ({
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
          localStorage.removeItem("phone");
          return;
        }

        try {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          axios.defaults.timeout = 10000;
          const response = await axios.post("https://amirrezaei2002x.shop/laravel/api/check-token-api");

          if (response.data?.success && response.data?.user) {
            set({
              user: response.data.user,
              orders: response.data.orders ?? null,
              messages: response.data.messages ?? null,
              token,
            });
            localStorage.setItem("phone", response.data.user?.mobile_number || "");
            await get().fetchWalletBalance();
          } else {
            console.warn("⚠️ پاسخ API نامعتبر است:", response.data?.message || "داده‌ای دریافت نشد");
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

      fetchWalletBalance: async () => {
        const token = get().token;
        if (!token) {
          console.warn("⚠️ توکن موجود نیست برای گرفتن موجودی ولت");
          return;
        }

        try {
          const response = await axios.post(
            "https://amirrezaei2002x.shop/laravel/api/getCoinBalanceOnChains",
            {
              currency: "USDT",
              network: "Ethereum",
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.success) {
            set({ wallet: response.data });
          } else {
            console.warn("⚠️ پاسخ API موجودی ولت موفقیت‌آمیز نبود:", response.data.message);
            set({ wallet: null });
          }
        } catch (err) {
          console.error("🚨 خطای API موجودی ولت:", err?.response?.data || err.message);
          set({ wallet: null });
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
            await get().fetchUserFromToken(token);
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
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      serialize: (state) => {
        try {
          const serialized = JSON.stringify(state);
          const encrypted = AES.encrypt(serialized, SECRET_KEY).toString();
          return encrypted;
        } catch (err) {
          console.error("🚨 خطای سریال‌سازی:", err.message);
          return "";
        }
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