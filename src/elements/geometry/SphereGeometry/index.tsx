import useComponentFunctions from "@/hooks/useComponentFunctions"
import { ElementProps } from "@/types"
import MeshMaterial from "@/components/general/MeshMaterial"

export default function SphereGeometry(props: ElementProps) {
  const {handleRun, onPointerOver} = useComponentFunctions(props)

  const {
    radius,
    widthSegments,
    heightSegments,
    phiStart,
    phiLength,
    thetaStart,
    thetaLength,
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
      <sphereGeometry args={[
        radius,
        widthSegments,
        heightSegments,
        phiStart,
        phiLength,
        thetaStart,
        thetaLength,
      ]} />
      <MeshMaterial name={fullProps.material_type} material={material} texture={props.texture}/>
    </mesh>
  )
}
