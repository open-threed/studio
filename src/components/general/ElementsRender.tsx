import { useState } from 'react'

import { EffectComposer, Outline } from '@react-three/postprocessing'
import Element from '../general/Element'
import { useElementsStore } from '../../store/elements'
import { ElementType } from '../../types'

export default function ElementsRender() {
  const { elements } = useElementsStore()

  const [hovered, onHover] = useState(null)
  const selected = hovered ? [hovered] : undefined

  return (
      <>
        {elements.map((item: ElementType) => (
          <Element
            key={item.id}
            onHover={onHover}
            item={item}
          />
        ))}
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline
            selection={selected}
            selectionLayer={10}
            edgeStrength={100}
          />
        </EffectComposer>
      </>
  )
}
