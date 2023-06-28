import { useEffect, useRef } from 'react'

import element from '../../matrix/element'
import useBlueprint from '../../hooks/useBlueprint'
import usePlayer from '../../hooks/usePlayer'
import { useElementsStore } from '../../store/elements'
import { ElementType } from '@/types'

type ElementProps = {
  item: ElementType
  onHover: React.Dispatch<React.SetStateAction<null>>
}

export default function Element({ item, onHover }: ElementProps) {
  const ref = useRef(null)
  const { run } = useBlueprint()
  const { isPlayerScreen } = usePlayer()
  const { setCurrent, setContextElementId } = useElementsStore()

  useEffect(() => {
    run('onMount', item.id)
  }, [])

  const handleElementClick = (item: ElementType) => {
    const hasClick = item.editable
    if(hasClick) {
      if (!isPlayerScreen) {
        setCurrent(item)
      } else {
        run('onClick', item.id)
      }
    }
  }

  const {
    eventObject,  
    object, 
    id,
    type,
    editable,
    position,
    rotation,
    scale,
    ...restOfProps
  } = item
  
  const Component = element[item.type]

  return (
    <group
      name={item.id}
      position={position}
      rotation={rotation}
      scale={scale}
      onContextMenu={({ stopPropagation }) => {
        stopPropagation();
        setContextElementId(item.id)
      }}
      onClick={({ stopPropagation }) => {
        stopPropagation();
        handleElementClick({
          ...item,
          eventObject: ref?.current,
          object: ref?.current
        });
      }}
      ref={ref}
    >
      <Component {...restOfProps} onHover={onHover} />
    </group>
  )
}
