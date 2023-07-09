import { Svg as SvgDrei } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { ElementProps, MeshRefHelper } from "@/types";

export default function Svg(props: ElementProps) {
  const squareRef = useRef<MeshRefHelper>();

  useFrame(({ camera }) => {
    const { x, y, z } = camera.position;
    squareRef.current.lookAt(x, y, z);
  });

  return (
    <group {...props} ref={squareRef}>
      <SvgDrei
        fillMaterial={{
          wireframe: false,
          color: 'white'
        }}
        position={[
          -0.5,
          0.5,
          0
        ]}
        scale={0.002}
        src="/svg/spotlight-svgrepo-com.svg"
        strokeMaterial={{
          wireframe: false
        }}
      />
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="" />
      </mesh>
    </group>
  )
}
