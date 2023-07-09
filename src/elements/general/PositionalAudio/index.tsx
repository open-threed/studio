import { PositionalAudio as PositionalAudioDrei } from "@react-three/drei"
import { Suspense } from "react"
import CONSTANTS from "@/constants"
import { ElementProps, useGLTFType } from "@/types"

import { Center, useGLTF } from "@react-three/drei"

interface PositionalAudioProps extends ElementProps {
  soundUrl: string
  distance: number
  autoplay: boolean
  loop: boolean
}

export default function PositionalAudio({
  soundUrl,
  distance,
  autoplay,
  loop,
  ...props
}: PositionalAudioProps) {
  const { nodes }:useGLTFType = useGLTF(`${CONSTANTS.cdn}/models/computer_speaker/computer_speaker.glb`)
  const list = Object.entries(nodes)

  return (
    <group {...props} scale={5}>
      <Center>
        {list.map((item:useGLTFType[]) => (
          <mesh key={item[0]} {...item[1]}>
            <meshNormalMaterial />
          </mesh>
        ))}
      </Center>
      <Suspense fallback={null}>
        <PositionalAudioDrei
          url={`${CONSTANTS.cdn}/sounds/${soundUrl}`}
          distance={distance}
          autoplay={autoplay}
          loop={loop}
          load
        />
      </Suspense>
    </group>
  )
}

