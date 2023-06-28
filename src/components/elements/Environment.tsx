import { Environment as EnvironmentDrei } from "@react-three/drei";
import { ElementProps } from "../../types";

export default function Environment(props: ElementProps) {
  return (
    <EnvironmentDrei {...props}/>
  )
}
