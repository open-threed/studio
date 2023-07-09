import useComponentFunctions from "@/hooks/useComponentFunctions"
import { ElementProps } from "@/types"
import MeshMaterial from "@/components/general/MeshMaterial"

export default function CapsuleGeometry(props: ElementProps) {
  const {handleRun, onPointerOver} = useComponentFunctions(props)

  const {
    radius,
    length,
    capSegments,
    radialSegments,
    material,
    ...restProps
  } = props

  const fullProps = {
    ...restProps,
    onClick: handleRun,
    onPointerOver: onPointerOver,
  }

  return (
    <mesh {...fullProps}>
      <capsuleGeometry args={[
        radius,
        length,
        capSegments,
        radialSegments,
      ]} />
      <MeshMaterial name={fullProps.material_type} material={material} texture={props.texture}/>
    </mesh>
  )
}
