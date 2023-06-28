import { useFilesStore } from "../store/files"

export default function useProjectFiles() {
  const { files, setFiles } = useFilesStore()

  function openFile(id: string) {
    setFiles([
      ...files.map((item) => {
        if(item.id===id){
          return {
            ...item,
            opened: true,
            selected: true,
          }
        }
        return {
          ...item,
          selected: false
        }
      })
    ])
  }

  return {
    openFile
  }
}