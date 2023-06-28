import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import CONSTANTS, { DocumentType } from '../constants'
import { GenericType } from '@/types'

interface MyState {
  document: DocumentType
  setDocument: (document: DocumentType) => void
  updateDocument: (document: GenericType) => void
}

export const useDocumentStore = create<MyState>()(
  persist(
    (set, get) => ({
      document: CONSTANTS.document,
      setDocument: (document) => set({ document }),
      updateDocument: (document) => set({
        document: { ...get().document, ...document }
      })
    }),
    {
      name: '@threed-document',
      partialize: (state) => ({ document: state.document }),
    }
  )
)