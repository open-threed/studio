import {
  MeshReflectorMaterial,
  MeshWobbleMaterial,
  MeshDistortMaterial,
  MeshRefractionMaterial,
  MeshTransmissionMaterial,
  MeshDiscardMaterial,
  PointMaterial,
  shaderMaterial,
} from "@react-three/drei"

const material = {
  meshDistortMaterial: MeshDistortMaterial,
  meshReflectorMaterial: MeshReflectorMaterial,
  meshRefractionMaterial: MeshRefractionMaterial,
  meshTransmissionMaterial: MeshTransmissionMaterial,
  meshWobbleMaterial: MeshWobbleMaterial,
  meshDiscardMaterial: MeshDiscardMaterial,
  pointMaterial: PointMaterial,
  shaderMaterial: shaderMaterial,

  lineBasicMaterial: 'lineBasicMaterial',
  lineDashedMaterial: 'lineDashedMaterial',
  material: 'material',
  meshBasicMaterial: 'meshBasicMaterial',
  meshDepthMaterial: 'meshDepthMaterial',
  meshDistanceMaterial: 'meshDistanceMaterial',
  meshLambertMaterial: 'meshLambertMaterial',
  meshMatcapMaterial: 'meshMatcapMaterial',
  meshNormalMaterial: 'meshNormalMaterial',
  meshPhongMaterial: 'meshPhongMaterial',
  meshPhysicalMaterial: 'meshPhysicalMaterial',
  meshStandardMaterial: 'meshStandardMaterial',
  meshToonMaterial: 'meshToonMaterial',
  pointsMaterial: 'pointsMaterial',
  rawShaderMaterial: 'rawShaderMaterial',
  shadowMaterial: 'shadowMaterial',
  spriteMaterial: 'spriteMaterial'
}

export default material
