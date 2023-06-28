import { Html } from "@react-three/drei";
import useToolbar from "../../hooks/useToolbar";
import { ElementProps } from "../../types";

type IframeType = {
  src: string
  width: number
  height: number
}

interface BrowserProps extends ElementProps {
  transform: boolean
  iframe: IframeType
}

export default function Browser({
  transform,
  iframe,
  ...props
}: BrowserProps) {
  const {showHorizontalTop} = useToolbar()
  return (
    <group {...props}>
      {!showHorizontalTop ? (
        <Html transform={transform} pointerEvents="none">
          <iframe
            src={iframe.src}
            width={iframe.width}
            height={iframe.height}
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