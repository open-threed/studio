import { Center, Text3D as Text3Drei } from "@react-three/drei";
import MeshMaterial from "../general/MeshMaterial";
import { ElementProps } from "../../types";

export default function Text3D({...props}: ElementProps) {
  const {material_type, text, material, ...restProps} = props
  return (
    <Center>
      <Text3Drei {...restProps}>
        {text}
        <MeshMaterial name={material_type} material={material} texture={props.texture}/>
      </Text3Drei>
    </Center>
  )
}
