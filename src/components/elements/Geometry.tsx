import useComponentFunctions from "../../hooks/useComponentFunctions"
import { ElementProps } from "../../types"
import MeshMaterial from "../general/MeshMaterial"

export const Box = (props: ElementProps) => <Geometry component='boxGeometry' {...props} />
export const Plane = (props: ElementProps) => <Geometry component='planeGeometry' {...props} />
export const Sphere = (props: ElementProps) => <Geometry component='sphereGeometry' {...props} />
export const Capsule = (props: ElementProps) => <Geometry component='capsuleGeometry' {...props} />
export const Circle = (props: ElementProps) => <Geometry component='circleGeometry' {...props} />
export const Cone = (props: ElementProps) => <Geometry component='coneGeometry' {...props} />
export const Cylinder = (props: ElementProps) => <Geometry component='cylinderGeometry' {...props} />
export const Dodecahedron = (props: ElementProps) => <Geometry component='dodecahedronGeometry' {...props} />
export const Extrude = (props: ElementProps) => <Geometry component='extrudeGeometry' {...props} />
export const Icosahedron = (props: ElementProps) => <Geometry component='icosahedronGeometry' {...props} />
export const Lathe = (props: ElementProps) => <Geometry component='latheGeometry' {...props} />
export const Octahedron = (props: ElementProps) => <Geometry component='octahedronGeometry' {...props} />
export const Ring = (props: ElementProps) => <Geometry component='ringGeometry' {...props} />
export const Tetrahedron = (props: ElementProps) => <Geometry component='tetrahedronGeometry' {...props} />
export const Torus = (props: ElementProps) => <Geometry component='torusGeometry' {...props} />
export const TorusKnot = (props: ElementProps) => <Geometry component='torusKnotGeometry' {...props} />
export const Tube = (props: ElementProps) => <Geometry component='tubeGeometry' {...props} />

export default function Geometry(props: ElementProps) {
  const {handleRun, onPointerOver} = useComponentFunctions(props)

  const {component, args, material, ...restProps} = props
  const fullProps = {
    ...restProps,
    onClick: handleRun,
    onPointerOver: onPointerOver,
  }

  const Comp = component

  return (
    <mesh {...fullProps}>
      <Comp args={args} />
      <MeshMaterial name={fullProps.material_type} material={material} texture={props.texture}/>
    </mesh>
  )
}
