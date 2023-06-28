import { Environment as EnvironmentDrei } from "@react-three/drei";
import { ElementProps } from "../../types";
import CONSTANTS from "@/constants";

export default function Environment(props: ElementProps) {
  return (
    <EnvironmentDrei {...props} path={`${CONSTANTS.cdn}/hdri/`} files={`${props.environment}.hdr`} />
  )
}
