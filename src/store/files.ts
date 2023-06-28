import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { File } from '../types'

interface MyState {
  files: File[]
  setFiles: (files: File[]) => void
  updateFiles: (files: File[]) => void
  addFile: (file: File) => void
}

export const useFilesStore = create<MyState>()(
  persist(
    (set, get) => ({
      files: [],
      setFiles: (files) => set({ files }),
      updateFiles: (files) => set({
        files: [ ...get().files, ...files ]
      }),
      addFile: (file) => set({
        files: [ ...get().files, file ]
      })
    }),
    {
      name: '@threed-files',
      partialize: (state) => ({ files: state.files }),
    }
  )
)