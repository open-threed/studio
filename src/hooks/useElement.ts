import mountNewElement from '../utils/mountNewElement'
import { useElementsStore } from '../store/elements'
import { ElementType } from '@/types'

export function useElement() {
  const {
    elements,
    createGlbElement,
    createElement,
    createElements
  } = useElementsStore()

  function customCreateGlbElement(props: ElementType) {
    createGlbElement(mountNewElement('Glb', props))
  }

  function customCreateElement({ type }: ElementType) {
    createElement(mountNewElement(type, {}))
  }

  function customCreateElements(data: ElementType[]) {
    createElements(
      data.map((item: string) => mountNewElement(item, {}))
    )
  }

  return {
    elements,
    createGlbElement: customCreateGlbElement,
    createElement: customCreateElement,
    createElements: customCreateElements
  }
}