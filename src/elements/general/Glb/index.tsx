import { Center, useGLTF } from "@react-three/drei"
import MeshMaterial from '@/components/general/MeshMaterial'
import useComponentFunctions from "@/hooks/useComponentFunctions"
import CONSTANTS from "@/constants"
import { ElementProps, useGLTFType } from "@/types"

export default function Glb(props: ElementProps) {
  const {handleRun, onPointerOver} = useComponentFunctions(props)

  const modelUrl = props.file.includes('http') ? props.file : `${CONSTANTS.cdn}/models/${props.file}/${props.file}.glb`

  const { nodes }:useGLTFType = useGLTF(modelUrl)
  const list = Object.entries(nodes)

  return (
    <group onClick={handleRun} onPointerOver={onPointerOver}>
      <Center>
        {list.map((item:useGLTFType[]) => (
          <mesh key={item[0]} {...item[1]}>
            <MeshMaterial
              name={props.material_type}
              material={props.material}
              texture={props.texture}
            />
          </mesh>
        ))}
      </Center>
    </group>
  )
}
