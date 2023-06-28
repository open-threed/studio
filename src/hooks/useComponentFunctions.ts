import { useEffect } from "react";
import useSdk from "../hooks/useSdk";
import usePlayer from "./usePlayer";
import { useFilesStore } from "../store/files";
import { ThreeEvent } from "@react-three/fiber";
import { ElementType } from "@/types";

export default function useComponentFunctions(props: ElementType) {
  const { isPlayerScreen } = usePlayer()
  const { files } = useFilesStore()
  const sdk = useSdk()

  function runFunction(e = props, functionName: string) {
    if(props?.fileId) {
      const he = files.find(({ id }) => id === props?.fileId)
      if (he?.content) {
        sdk.run(e, he.content, functionName);
      }
    }
  }

  function onMount() {
    runFunction(props, 'onMount')
  }

  useEffect(() => {
    if(isPlayerScreen) {
      onMount()
    }
  }, [])

  function handleRun(e: ThreeEvent<MouseEvent>) {
    runFunction(e, 'onClick')
  }

  function onPointerOver(e: ThreeEvent<MouseEvent>) {
    runFunction(e, 'onPointerOver')
  }

  return {
    runFunction,
    handleRun,
    onPointerOver
  }
}