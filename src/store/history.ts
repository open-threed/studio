import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type History = {
  id: string
  content: string
}

interface MyState {
  history: History[]
  setHistory: (history: History[]) => void
  updateHistory: (history: History[]) => void
}

export const useHistoryStore = create<MyState>()(
  persist(
    (set, get) => ({
      history: [],
      setHistory: (history) => set({ history }),
      updateHistory: (history) => set({
        history: [ ...get().history, ...history ]
      })
    }),
    {
      name: '@threed-history',
      partialize: (state) => ({ history: state.history }),
    }
  )
)