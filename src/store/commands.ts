import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import CONSTANTS from '../constants'

type Command = {
  label: string
  data: string[]
}

interface MyState {
  commands: Command[]
  setCommands: (commands: Command[]) => void
  updateCommands: (commands: Command[]) => void
}

export const useCommandsStore = create<MyState>()(
  persist(
    (set, get) => ({
      commands: CONSTANTS.commands,
      setCommands: (commands) => set({ commands }),
      updateCommands: (commands) => set({
        commands: { ...get().commands, ...commands }
      })
    }),
    {
      name: '@threed-commands',
      partialize: (state) => ({ commands: state.commands }),
    }
  )
)