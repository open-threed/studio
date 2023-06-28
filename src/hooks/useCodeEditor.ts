import getOpenedFiles from '../utils/getOpenedFiles'
import { useFilesStore } from '../store/files'

export default function useCodeEditor() {
  const { files, setFiles } = useFilesStore()

  const openedObjects = getOpenedFiles(files) || [];

  function closeFile(id: string) {
    setFiles([
      ...files.map((item) => {
        if(item.id===id){
          return {
            ...item,
            opened: false,
            selected: false
          }
        }
        return item
      })
    ])
  }

  function updateCode(id: string, code: string | undefined) {
    setFiles([
      ...files.map((item) => {
        if(item.id===id){
          return {
            ...item,
            content: code
          }
        }
        return item
      })
    ])
  }

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
    openedObjects,
    closeFile,
    updateCode,
    openFile
  }
}