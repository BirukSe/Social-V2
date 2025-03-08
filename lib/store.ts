import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  fullName?: string;
  email: string;
  username?: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchData: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),

      fetchData: async () => {
        try {
          const response = await fetch("/api/verify", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) {
            throw new Error("Unauthorized");
          }

          const data = await response.json();
          set({ user: data.user }); // Update Zustand store

        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      },
    }),
    {
      name: "user-storage", // Storage key name
      storage: createJSONStorage(() => localStorage), // ✅ Corrected storage type
    }
  )
);
