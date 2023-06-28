import { Canvas } from '@react-three/fiber'

import EditorControls from '../general/EditorControls'
import ElementsRender from '../general/ElementsRender'
import CameraControls from '../general/CameraControls'
import Helpers from '../general/Helpers'
import { useDocumentStore } from '../../store/document'
import { useElementsStore } from '../../store/elements'
import { useSettingsStore } from '@/store/settings'

export default function Mesa() {
  const { document } = useDocumentStore()
  const { setCurrent } = useElementsStore()
  const { loadingView } = useSettingsStore()

  const canvas = document.canvas
  const onPointerMissed = () => setCurrent(null)

  return (
    <Canvas {...canvas} onPointerMissed={onPointerMissed} className={`${!loadingView ? 'opacity-100' : 'opacity-0'} `}>
      <>
        <ElementsRender />
        <CameraControls />
        <EditorControls />
        <Helpers />
      </>
    </Canvas>
  )
}
