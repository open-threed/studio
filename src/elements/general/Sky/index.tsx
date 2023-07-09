import { Sky as SkyDrei } from "@react-three/drei";
import { ElementProps } from "@/types";

export default function Sky(props: ElementProps) {
  return (
    <SkyDrei {...props}/>
  )
}
