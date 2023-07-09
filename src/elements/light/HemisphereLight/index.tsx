import * as THREE from 'three'
import { Center, useHelper } from "@react-three/drei"
import { useRef } from "react"
import { ElementProps, MeshRefHelper } from '@/types';

interface HemisphereLightProps extends ElementProps {
  position: THREE.Vector3
}

export default function HemisphereLight({
  position,
  ...props
}: HemisphereLightProps) {
  const rLight = useRef<MeshRefHelper>(null)
  useHelper(rLight, THREE.HemisphereLightHelper, 5);

  return (
    <Center bottom right position={position}>
      <group>
        <mesh position={[0,1,0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial />
        </mesh>
        <hemisphereLight {...props} ref={rLight}/>
      </group>
    </Center>
  )
}
