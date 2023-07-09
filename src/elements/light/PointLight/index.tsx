import * as THREE from 'three'
import { Center, useHelper } from "@react-three/drei"
import { useRef } from "react"
import { ElementProps, MeshRefHelper } from '@/types'
import { useDocumentStore } from '@/store/document'

export default function PointLight(props: ElementProps) {
  const rLight = useRef<MeshRefHelper>(null)
  const { document } = useDocumentStore()

  useHelper(document.helpers && rLight, THREE.PointLightHelper);

  return (
    <Center bottom right>
      <group>
        {!document.helpers && (
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial />
          </mesh>
        )}
        <pointLight {...props} ref={rLight}/>
      </group>
    </Center>
  )
}
