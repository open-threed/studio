import { Image as ImageDrai } from "@react-three/drei";
import CONSTANTS from "@/constants";
import { ElementProps } from "@/types";

interface ImageProps extends ElementProps {
  file: string
}

export default function Image({file, ...props}: ImageProps) {
  return (
    <ImageDrai {...props} url={`${CONSTANTS.cdn}/images/${file}`} />
  )
}