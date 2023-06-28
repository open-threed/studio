import { useDocumentStore } from "../../store/document"

export function GlbHelper() {
  const { document } = useDocumentStore()

  if(!document.helpers) {
    return null
  }

  return (
    <meshStandardMaterial wireframe />
  )
}