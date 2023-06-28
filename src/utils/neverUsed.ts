import { GenericType } from "@/types"

function noAction(value: GenericType) {
  return value
}

export function neverUsed(value: GenericType) {
  noAction(value)
}