import { create } from 'zustand';

const useStore = create((set) => ({
  kycLevel: 0, // مقدار پیش‌فرض
  setKycLevel: (level) => set({ kycLevel: level }),
}));

export { useStore };