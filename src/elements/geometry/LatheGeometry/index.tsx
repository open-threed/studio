import useComponentFunctions from "@/hooks/useComponentFunctions"
import { ElementProps } from "@/types"
import MeshMaterial from "@/components/general/MeshMaterial"

export default function LatheGeometry(props: ElementProps) {
  const {handleRun, onPointerOver} = useComponentFunctions(props)

  const {args, material, ...restProps} = props
  const fullProps = {
    ...restProps,
    onClick: handleRun,
    onPointerOver: onPointerOver,
  }

  return (
    <mesh {...fullProps}>
      <latheGeometry args={args} />
      <MeshMaterial name={fullProps.material_type} material={material} texture={props.texture}/>
    </mesh>
  )
}
