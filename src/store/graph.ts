import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Graph } from '@/types'

interface MyState {
  graph: Graph
  graphLock: boolean,
  setGraph: (graph: Graph) => void
  updateGraph: (graph: Graph) => void
  setGraphLock: (graphLock: boolean) => void
}

export const useGraphStore = create<MyState>()(
  persist(
    (set, get) => ({
      graph: null,
      graphLock: false,
      setGraph: (graph) => set({ graph }),
      updateGraph: (graph) => set({
        graph: { ...get().graph, ...graph }
      }),
      setGraphLock: (graphLock) => set({ graphLock }),
    }),
    {
      name: '@threed-graph',
      partialize: (state) => ({ graph: state.graph }),
    }
  )
)