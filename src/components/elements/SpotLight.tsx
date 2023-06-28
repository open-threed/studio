import * as THREE from 'three'
import { Center, useHelper } from "@react-three/drei"
import { useRef } from "react"
import usePlayer from '../../hooks/usePlayer'
import { ElementProps, MeshRefHelper } from '../../types'

interface SpotLightProps extends ElementProps {
  target: number
}

export default function SpotLight({
  target,
  ...props
}: SpotLightProps) {
  const rLight = useRef<MeshRefHelper>(null)
  const { isPlayerScreen } = usePlayer()

  useHelper(!isPlayerScreen && rLight, THREE.SpotLightHelper);

  return (
    <Center bottom right>
      <group>
        <mesh position={[0,1,0]}>
          <sphereGeometry args={isPlayerScreen?[0,0,0]:[0.2, 16, 16]} />
          <meshBasicMaterial />
        </mesh>
        <spotLight {...props} ref={rLight} />
      </group>
    </Center>
  )
}
