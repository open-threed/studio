import { TransformControls } from '@react-three/drei'

import usePlayer from '../../hooks/usePlayer'
import { useSettingsStore } from '../../store/settings'
import { useElementsStore } from '../../store/elements'

export default function EditorControls() {
  const { isPlayerScreen } = usePlayer()
  const { settings } = useSettingsStore()
  const { current, updateElement } = useElementsStore()

  const transformControlsObject = !settings.tool.selectGroup
    ? current?.object
    : current?.eventObject

  const isActive = (current?.object && !isPlayerScreen)

  if(!isActive) {
    return null
  }

  return (
    <TransformControls
      object={transformControlsObject}
      mode={settings.tool.move}
      onMouseUp={() => {
        updateElement({
          id: current.id,
          position: Object.entries(transformControlsObject.position).map((item) =>item[1]),
          // rotation: Object.entries({x, y, z}).map((item) =>item[1]),
          scale: Object.entries(transformControlsObject.scale).map((item) =>item[1])
        })
      }}
    />
  )
}
