import useComponentFunctions from "@/hooks/useComponentFunctions"
import { ElementProps } from "@/types"
import MeshMaterial from "@/components/general/MeshMaterial"

export default function DodecahedronGeometry(props: ElementProps) {
  const {handleRun, onPointerOver} = useComponentFunctions(props)

  const {
    radius,
    detail,
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
      <dodecahedronGeometry args={[
        radius,
        detail,
      ]} />
      <MeshMaterial name={fullProps.material_type} material={material} texture={props.texture}/>
    </mesh>
  )
}
