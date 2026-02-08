import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SettingsState {
  storeName: string
  setStoreName: (name: string) => void
}

const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      storeName: "Titik Kasir",
      setStoreName: (name) => set({ storeName: name }),
    }),
    {
      name: "titikkasir-settings",
    },
  ),
)

export default useSettingsStore
