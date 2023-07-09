import { Html } from "@react-three/drei";
import useToolbar from "@/hooks/useToolbar";
import { ElementProps } from "@/types";

interface BrowserProps extends ElementProps {
  transform: boolean
  url: string
  width: number
  height: number
}

export default function Browser({
  transform,
  url,
  width,
  height,
  ...props
}: BrowserProps) {
  const {showHorizontalTop} = useToolbar()
  return (
    <group {...props}>
      {!showHorizontalTop ? (
        <Html transform={transform} pointerEvents="none">
          <iframe
            src={url}
            width={width}
            height={height}
          />
        </Html>
      ) : (
        <>
          <mesh>
            <planeGeometry args={[50,30]} />
            <meshBasicMaterial color={props.color} />
          </mesh>
          <mesh rotation={[0,3.14,0]}>
            <planeGeometry args={[50,30]} />
            <meshBasicMaterial color={props.color} />
          </mesh>
        </>
      )}
    </group>
  )
}