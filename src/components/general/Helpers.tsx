import { Perf } from 'r3f-perf'

import usePlayer from '../../hooks/usePlayer'
import { useSettingsStore } from '../../store/settings'
import { useDocumentStore } from '../../store/document'

export default function Helpers() {
  const { isPlayerScreen } = usePlayer()
  const { settings } = useSettingsStore()
  const { document } = useDocumentStore()

  if(isPlayerScreen) {
    return null
  }

  return (
    <group>
      <>
        {document.axes && <axesHelper args={[25]} />}
        {document.helpers && <gridHelper />}
      </>
      {settings.performanceMonitor.enabled && (
        <Perf {...settings.performanceMonitor} />
      )}
    </group>
  )
}
