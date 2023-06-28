import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import CONSTANTS, { SettingsType } from '../constants'

interface MyState {
  loadingView: boolean
  settings: SettingsType
  setLoadingView: (loadingView: boolean) => void
  setSettings: (settings: SettingsType) => void
  setTheme: (theme: string) => void
  setView: (main: string) => void
  setToolMove: (move: string) => void
}

export const useSettingsStore = create<MyState>()(
  persist(
    (set, get) => ({
      loadingView: false,
      settings: CONSTANTS.settings,
      setLoadingView: (loadingView) => set({ loadingView }),
      setSettings: (settings) => set({ settings }),
      setTheme: (theme) => set({ settings: { ...get().settings, theme } }),
      setView: (main) => set({ settings: { ...get().settings, main } }),
      setToolMove: (move: string) => {
        set({
          settings: {
            ...get().settings,
            tool: {
              ...get().settings.tool,
              move
            }
          }
        })
      }
    }),
    {
      name: '@threed-settings',
      partialize: (state) => ({ settings: state.settings }),
    }
  )
)