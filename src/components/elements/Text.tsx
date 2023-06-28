import { Text as TextDrei } from "@react-three/drei";
import MeshMaterial from "../general/MeshMaterial";
import { ElementProps } from "../../types";

export default function Text(props: ElementProps) {
  const {material_type, text, material, ...restProps} = props
  return (
    <TextDrei {...restProps}>
      {text}
      <MeshMaterial name={material_type} material={material} texture={props.texture}/>
    </TextDrei>
  )
}
