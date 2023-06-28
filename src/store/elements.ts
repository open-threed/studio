import { ElementType } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MyState {
  elements: ElementType[]
  current: ElementType
  contextElementId: string | null
  setCurrent: (current: ElementType) => void
  updateCurrent: (current: ElementType) => void
  setContextElementId: (contextElementId: string | null) => void
  setElements: (elements: ElementType[]) => void
  updateElements: (elements: ElementType[]) => void
  createGlbElement: (element: ElementType) => void
  createElement: (element: ElementType) => void
  createElements: (elements: ElementType[]) => void
  updateElement: (element: ElementType) => void
  removeElement: (id: string) => void
}

export const useElementsStore = create<MyState>()(
  persist(
    (set, get) => ({
      elements: [],
      current: null,
      contextElementId: null,
      setCurrent: (current) => set({ current }),
      updateCurrent: (current) => set({ ...get().current, current }),
      setContextElementId: (contextElementId) => set({ contextElementId }),
      setElements: (elements) => set({ elements }),
      updateElements: (elements) => set({
        elements: [ ...get().elements, ...elements ]
      }),
      createGlbElement: (element) => set({
        elements: [ ...get().elements, element ],
      }),
      createElement: (element) => set({
        elements: [ ...get().elements, element ]
      }),
      createElements: (elements) => set({
        elements: [ ...get().elements, ...elements ]
      }),
      updateElement: (element) => set({
        current: {
          ...get().elements.find(({id}) => id===element?.id),
          ...element
        },
        elements: [
          ...get().elements.map((item) => {
            if(item?.id === element?.id) {
              return {
                ...item,
                ...element
              }
            }
            return item
          })
        ]
      }),
      removeElement: (id) => set({
        current: null,
        elements: [
          ...get().elements.filter((item) => item.id !== id)
        ]
      })
    }),
    {
      name: '@threed-elements',
      partialize: (state) => ({ elements: state.elements }),
    }
  )
)

