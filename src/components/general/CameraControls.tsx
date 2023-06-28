import { MapControls, OrbitControls } from '@react-three/drei'
import { useDocumentStore } from '../../store/document'

export default function CameraControls() {
  const { document } = useDocumentStore()

  return (
    <>
      <OrbitControls {...document.orbitalControls}/>
      <MapControls enabled={!document.orbitalControls.enabled} />
    </>
  )
}
