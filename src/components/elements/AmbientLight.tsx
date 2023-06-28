import { Center } from "@react-three/drei"
import { useRef } from "react"
import { Vector3 } from "three"
import { ElementProps } from "../../types"

type AmbienteLightPropsType = {
  position: Vector3 | undefined,
  props: ElementProps
}

export default function AmbientLight({
  position,
  ...props
}: AmbienteLightPropsType) {
  const rLight = useRef(null)
  return (
    <Center bottom right position={position}>
      <group>
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial />
        </mesh>
        <ambientLight {...props} ref={rLight}/>
      </group>
    </Center>
  )
}
