import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import CONSTANTS, { LayoutType } from '../constants'
import { GenericType } from '@/types'

interface ItemType {
  name: string
  value: GenericType
}

interface MyState {
  layout: LayoutType
  footer: string | null
  setLayout: (layout: LayoutType) => void
  setFooter: (footer: string | null) => void
  updateLayout: (layout: LayoutType) => void
  setModalOpen: (modal: ItemType) => void
  setToolbarOpen: (toolbar: ItemType) => void
  setToolbarShow: (toolbar: ItemType) => void
}

export const useLayoutStore = create<MyState>()(
  persist(
    (set, get) => ({
      layout: CONSTANTS.layout,
      footer: '',
      setLayout: (layout) => set({ layout }),
      setFooter: (footer) => set({ footer }),
      updateLayout: (layout) => set({
        layout: { ...get().layout, ...layout }
      }),
      setModalOpen: (modal) => set({
        layout: {
          ...get().layout,
          modal: {
            ...get().layout.modal,
            open: {
              ...get().layout.modal.open,
              [modal.name]: modal.value
            }
          }
        }
      }),
      setToolbarOpen: (toolbar) => set({
        layout: {
          ...get().layout,
          toolbar: {
            ...get().layout.toolbar,
            [toolbar.name]: {
              ...get().layout.toolbar[toolbar.name],
              expanded: toolbar.value
            }
          }
        }
      }),
      setToolbarShow: (toolbar) => set({
        layout: {
          ...get().layout,
          toolbar: {
            ...get().layout.toolbar,
            [toolbar.name]: {
              ...get().layout.toolbar[toolbar.name],
              visible: toolbar.value
            }
          }
        }
      })
    }),
    {
      name: '@threed-layout',
      partialize: (state) => ({ layout: state.layout }),
    }
  )
)
