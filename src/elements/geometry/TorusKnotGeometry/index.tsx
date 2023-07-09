import useComponentFunctions from "@/hooks/useComponentFunctions"
import { ElementProps } from "@/types"
import MeshMaterial from "@/components/general/MeshMaterial"

export default function TorusKnotGeometry(props: ElementProps) {
  const {handleRun, onPointerOver} = useComponentFunctions(props)

  const {
    radius,
    tube,
    radialSegments,
    tubularSegments,
    p,
    q,
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
      <torusKnotGeometry args={[
        radius,
        tube,
        radialSegments,
        tubularSegments,
        p,
        q,
      ]} />
      <MeshMaterial name={fullProps.material_type} material={material} texture={props.texture}/>
    </mesh>
  )
}
