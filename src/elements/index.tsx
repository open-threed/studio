// Geometry

import Box from '@/elements/geometry/BoxGeometry'
import BoxControls from '@/elements/geometry/BoxGeometry/Controls';
import propsBox from '@/elements/geometry/BoxGeometry/props'

import Capsule from '@/elements/geometry/CapsuleGeometry'
import CapsuleControls from '@/elements/geometry/CapsuleGeometry/Controls';
import propsCapsule from '@/elements/geometry/CapsuleGeometry/props'

import Circle from '@/elements/geometry/CircleGeometry'
import CircleControls from '@/elements/geometry/CircleGeometry/Controls';
import propsCircle from '@/elements/geometry/CircleGeometry/props'

import Cone from '@/elements/geometry/ConeGeometry'
import ConeControls from '@/elements/geometry/ConeGeometry/Controls';
import propsCone from '@/elements/geometry/ConeGeometry/props'

import Cylinder from '@/elements/geometry/CylinderGeometry'
import CylinderControls from '@/elements/geometry/CylinderGeometry/Controls';
import propsCylinder from '@/elements/geometry/CylinderGeometry/props'

import Dodecahedron from '@/elements/geometry/DodecahedronGeometry'
import DodecahedronControls from '@/elements/geometry/DodecahedronGeometry/Controls';
import propsDodecahedron from '@/elements/geometry/DodecahedronGeometry/props'

import Extrude from '@/elements/geometry/ExtrudeGeometry'
import ExtrudeControls from '@/elements/geometry/ExtrudeGeometry/Controls';
import propsExtrude from '@/elements/geometry/ExtrudeGeometry/props'

import Icosahedron from '@/elements/geometry/IcosahedronGeometry'
import IcosahedronControls from '@/elements/geometry/IcosahedronGeometry/Controls';
import propsIcosahedron from '@/elements/geometry/IcosahedronGeometry/props'

import Lathe from '@/elements/geometry/LatheGeometry'
import LatheControls from '@/elements/geometry/LatheGeometry/Controls';
import propsLathe from '@/elements/geometry/LatheGeometry/props'

import Octahedron from '@/elements/geometry/OctahedronGeometry'
import OctahedronControls from '@/elements/geometry/OctahedronGeometry/Controls';
import propsOctahedron from '@/elements/geometry/OctahedronGeometry/props'

import Plane from '@/elements/geometry/PlaneGeometry'
import PlaneControls from '@/elements/geometry/PlaneGeometry/Controls';
import propsPlane from '@/elements/geometry/PlaneGeometry/props'

import Ring from '@/elements/geometry/RingGeometry'
import RingControls from '@/elements/geometry/RingGeometry/Controls';
import propsRing from '@/elements/geometry/RingGeometry/props'

import Sphere from '@/elements/geometry/SphereGeometry'
import SphereControls from '@/elements/geometry/SphereGeometry/Controls';
import propsSphere from '@/elements/geometry/SphereGeometry/props'

import Tetrahedron from '@/elements/geometry/TetrahedronGeometry'
import TetrahedronControls from '@/elements/geometry/TetrahedronGeometry/Controls';
import propsTetrahedron from '@/elements/geometry/TetrahedronGeometry/props'

import Torus from '@/elements/geometry/TorusGeometry'
import TorusControls from '@/elements/geometry/TorusGeometry/Controls';
import propsTorus from '@/elements/geometry/TorusGeometry/props'

import TorusKnot from '@/elements/geometry/TorusKnotGeometry'
import TorusKnotControls from '@/elements/geometry/TorusKnotGeometry/Controls';
import propsTorusKnot from '@/elements/geometry/TorusKnotGeometry/props'

import Tube from '@/elements/geometry/TubeGeometry'
import TubeControls from '@/elements/geometry/TubeGeometry/Controls';
import propsTube from '@/elements/geometry/TubeGeometry/props'

// General

import Browser from '@/elements/general/Browser'
import BrowserControls from '@/elements/general/Browser/Controls';
import propsBrowser from '@/elements/general/Browser/props'

import Environment from '@/elements/general/Environment'
import EnvironmentControls from '@/elements/general/Environment/Controls';
import propsEnvironment from '@/elements/general/Environment/props'

import Glb from '@/elements/general/Glb'
import GlbControls from '@/elements/general/Glb/Controls';
import propsGlb from '@/elements/general/Glb/props'

import Image from '@/elements/general/Image'
import ImageControls from '@/elements/general/Image/Controls';
import propsImage from '@/elements/general/Image/props'

import PositionalAudio from '@/elements/general/PositionalAudio'
import PositionalAudioControls from '@/elements/general/PositionalAudio/Controls';
import propsPositionalAudio from '@/elements/general/PositionalAudio/props'

import Sky from '@/elements/general/Sky'
import SkyControls from '@/elements/general/Sky/Controls';
import propsSky from '@/elements/general/Sky/props'

import Stars from '@/elements/general/Stars'
import StarsControls from '@/elements/general/Stars/Controls';
import propsStars from '@/elements/general/Stars/props'

import Svg from '@/elements/general/Svg'
import SvgControls from '@/elements/general/Svg/Controls';
import propsSvg from '@/elements/general/Svg/props'

import Text from '@/elements/general/Text'
import TextControls from '@/elements/general/Text/Controls';
import propsText from '@/elements/general/Text/props'

import Text3D from '@/elements/general/Text3D'
import Text3DControls from '@/elements/general/Text3D/Controls';
import propsText3D from '@/elements/general/Text3D/props'

// Light

import AmbientLight from '@/elements/light/AmbientLight'
import AmbientLightControls from '@/elements/light/AmbientLight/Controls';
import propsAmbientLight from '@/elements/light/AmbientLight/props'

import DirectionalLight from '@/elements/light/DirectionalLight'
import DirectionalLightControls from '@/elements/light/DirectionalLight/Controls';
import propsDirectionalLight from '@/elements/light/DirectionalLight/props'

import HemisphereLight from '@/elements/light/HemisphereLight'
import HemisphereLightControls from '@/elements/light/HemisphereLight/Controls';
import propsHemisphereLight from '@/elements/light/HemisphereLight/props'

import PointLight from '@/elements/light/PointLight'
import PointLightControls from '@/elements/light/PointLight/Controls';
import propsPointLight from '@/elements/light/PointLight/props'

import SpotLight from '@/elements/light/SpotLight'
import SpotLightControls from '@/elements/light/SpotLight/Controls';
import propsSpotLight from '@/elements/light/SpotLight/props'


import CONSTANTS from '@/constants';
import processElements from '@/utils/processElements';

type ElementsType = {
  [key: string]: any
}

const matrix = [
  ['Box', [Box, BoxControls, propsBox]],
  ['Capsule', [Capsule, CapsuleControls, propsCapsule]],
  ['Circle', [Circle, CircleControls, propsCircle]],
  ['Cone', [Cone, ConeControls, propsCone]],
  ['Cylinder', [Cylinder, CylinderControls, propsCylinder]],
  ['Dodecahedron', [Dodecahedron, DodecahedronControls, propsDodecahedron]],
  ['Extrude', [Extrude, ExtrudeControls, propsExtrude]],
  ['Icosahedron', [Icosahedron, IcosahedronControls, propsIcosahedron]],
  ['Lathe', [Lathe, LatheControls, propsLathe]],
  ['Octahedron', [Octahedron, OctahedronControls, propsOctahedron]],
  ['Plane', [Plane, PlaneControls, propsPlane]],
  ['Ring', [Ring, RingControls, propsRing]],
  ['Sphere', [Sphere, SphereControls, propsSphere]],
  ['Tetrahedron', [Tetrahedron, TetrahedronControls, propsTetrahedron]],
  ['Torus', [Torus, TorusControls, propsTorus]],
  ['TorusKnot', [TorusKnot, TorusKnotControls, propsTorusKnot]],
  ['Tube', [Tube, TubeControls, propsTube]],

  ['Browser', [Browser, BrowserControls, propsBrowser]],
  ['Environment', [Environment, EnvironmentControls, propsEnvironment]],
  ['Glb', [Glb, GlbControls, propsGlb]],
  ['Image', [Image, ImageControls, propsImage]],
  ['PositionalAudio', [PositionalAudio, PositionalAudioControls, propsPositionalAudio]],
  ['Sky', [Sky, SkyControls, propsSky]],
  ['Stars', [Stars, StarsControls, propsStars]],
  ['Svg', [Svg, SvgControls, propsSvg]],
  ['Text', [Text, TextControls, propsText]],
  ['Text3D', [Text3D, Text3DControls, propsText3D]],
    
  ['AmbientLight', [AmbientLight, AmbientLightControls, propsAmbientLight]],
  ['DirectionalLight', [DirectionalLight, DirectionalLightControls, propsDirectionalLight]],
  ['HemisphereLight', [HemisphereLight, HemisphereLightControls, propsHemisphereLight]],
  ['PointLight', [PointLight, PointLightControls, propsPointLight]],
  ['SpotLight', [SpotLight, SpotLightControls, propsSpotLight]],
]

function mountMatrix(value: 'three' | 'controls' | 'props') {
  const tag = {
    three: 0,
    controls: 1,
    props: 2
  }
  return matrix.reduce((a, v) => ({
    ...a, [String(v[0])]: v[1][tag[value]]
  }), {})
}

export const elementThree: ElementsType = mountMatrix('three')
export const elementControls: ElementsType = mountMatrix('controls')
const elements: ElementsType = mountMatrix('props')

export const elementsFull = processElements(elements, {
  MATERIAL: CONSTANTS.material,
  OBJECT: CONSTANTS.object,
  LIGHT: CONSTANTS.light,
})

export default elements
