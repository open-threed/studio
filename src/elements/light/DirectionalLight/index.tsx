import * as THREE from 'three'
import { Center, useHelper } from "@react-three/drei"
import { useRef } from "react"
import usePlayer from '@/hooks/usePlayer'
import { ElementProps, MeshRefHelper } from '@/types'
import { neverUsed } from '@/utils/neverUsed'

interface DirectionalLightProps extends ElementProps {
  target: number
}

export default function DirectionalLight({
  target,
  ...props
}: DirectionalLightProps) {
  const rLight = useRef<MeshRefHelper>(null)
  const { isPlayerScreen } = usePlayer()

  neverUsed(target)
  useHelper(!isPlayerScreen && rLight, THREE.DirectionalLightHelper);

  return (
    <Center bottom right>
      <group>
        <mesh position={[0,1,0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial />
        </mesh>
        <directionalLight {...props} ref={rLight}/>
      </group>
    </Center>
  )
}
