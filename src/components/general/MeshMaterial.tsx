import * as THREE from 'three'

import materialz from "../../matrix/material"
import { useTexture } from '@react-three/drei'
import CONSTANTS from '../../constants'
import { MaterialType } from '@/types'

type materialName = 'meshDistortMaterial'
  | 'meshReflectorMaterial'
  | 'meshRefractionMaterial'
  | 'meshTransmissionMaterial'
  | 'meshWobbleMaterial'
  | 'meshDiscardMaterial'
  | 'pointMaterial'
  | 'shaderMaterial'
  | 'lineBasicMaterial'
  | 'lineDashedMaterial'
  | 'material'
  | 'meshBasicMaterial'
  | 'meshDepthMaterial'
  | 'meshDistanceMaterial'
  | 'meshLambertMaterial'
  | 'meshMatcapMaterial'
  | 'meshNormalMaterial'
  | 'meshPhongMaterial'
  | 'meshPhysicalMaterial'
  | 'meshStandardMaterial'
  | 'meshToonMaterial'
  | 'pointsMaterial'
  | 'rawShaderMaterial'
  | 'shadowMaterial'
  | 'spriteMaterial'

type MeshMaterialProps = {
  name: materialName
  material: MaterialType
  texture?: string
}

export default function MeshMaterial({
  name, material, texture
}: MeshMaterialProps) {
  const hasTexture = texture !== 'none'
  const textureUrl = !hasTexture ? '/img/none-texture.jpg' : `${CONSTANTS.cdn}/textures/wood_board/${texture}.jpg`
  const map = useTexture(textureUrl)

  const Comp = materialz[name]
  return (
    <>
      <Comp {...material} side={THREE.DoubleSide} map={map} />
    </>
  )
}
