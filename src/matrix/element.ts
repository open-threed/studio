import Environment from '../components/elements/Environment'
import Sky from '../components/elements/Sky'
import AmbientLight from '../components/elements/AmbientLight'
import PointLight from '../components/elements/PointLight'
import PositionalAudio from '../components/elements/PositionalAudio'
import Text from '../components/elements/Text'
import Text3D from '../components/elements/Text3D'
import Browser from '../components/elements/Browser'
import Image from '../components/elements/Image'
import Glb from '../components/elements/Glb'
import Stars from '../components/elements/Stars'
import DirectionalLight from '../components/elements/DirectionalLight'
import HemisphereLight from '../components/elements/HemisphereLight'
import SpotLight from '../components/elements/SpotLight'
import Svg from '../components/elements/Svg'

import {
  Box,
  Plane,
  Sphere,
  Capsule,
  Circle,
  Cone,
  Cylinder,
  Dodecahedron,
  Extrude,
  Icosahedron,
  Lathe,
  Octahedron,
  Ring,
  Tetrahedron,
  Torus,
  TorusKnot,
  Tube
} from '../components/elements/Geometry'

import { ReactThreeElement } from '@/types'

type ElementMatrix = {
  [element: string]: ReactThreeElement
}

const element: ElementMatrix = {
  Box,
  Capsule,
  Circle,
  Cone,
  Cylinder,
  Dodecahedron,
  Extrude,
  Icosahedron,
  Lathe,
  Octahedron,
  Ring,
  Tetrahedron,
  Torus,
  TorusKnot,
  Tube,
  Environment,
  Stars,
  Sky,
  AmbientLight,
  PointLight,
  Plane,
  Sphere,
  PositionalAudio,
  Text,
  Text3D,
  Browser,
  Image,
  Glb,
  DirectionalLight,
  HemisphereLight,
  SpotLight,
  Svg,
}

export default element
