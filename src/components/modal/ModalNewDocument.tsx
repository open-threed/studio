import { FormEvent, useEffect, useRef } from "react";
import useModal from "../../hooks/useModal";
import { nanoid } from 'nanoid';
import { useDocumentStore } from "../../store/document";
import { useLayoutStore } from "../../store/layout";
import { useFilesStore } from "../../store/files";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useHistoryStore } from "@/store/history";
import { useGraphStore } from "@/store/graph";
import { useSettingsStore } from "@/store/settings";
import { useCommandsStore } from "@/store/commands";
import { useElementsStore } from "@/store/elements";

const readJsonFile = (file: Blob) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.onload = event => {
      if (event.target) {
        resolve(JSON.parse(event.target.result as string))
      }
    }

    fileReader.onerror = error => reject(error)
    fileReader.readAsText(file)
  })

export default function ModalNewDocument() {
  const { isOpenedNewDocumentModal } = useModal()
  const { updateDocument, setDocument } = useDocumentStore()
  const { setModalOpen, setLayout, setFooter } = useLayoutStore()
  const { updateFiles, setFiles } = useFilesStore()
  
  const { setGraph, setGraphLock } = useGraphStore()
  const { setHistory } = useHistoryStore()
  const { setSettings, setLoadingView } = useSettingsStore()
  const { setCommands } = useCommandsStore()
  const { setCurrent, setElements, setContextElementId } = useElementsStore()

  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const titleRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)


  
  useEffect(() => {
    setTimeout(() => {
      if(titleRef.current) {
        titleRef.current.focus()
      }
    }, 100)
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    updateDocument({
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
    })
    
    updateFiles([
        {
          id: nanoid(6),
          name: 'scene.js',
          opened: true,
          selected: true,
          content: `// Welcome to ThreeD Studio Code!
// Use sdk.help() to see more details.

function onMount() {
  sdk.notifications.show({
    title: 'file started ID: ' + sdk.component.fileId,
    text: 'haha'
  })
}

`
        },
        {
          id: nanoid(6),
          name: 'object.js',
          opened: false,
          selected: false,
          content: `// Welcome to ThreeD Studio Code!
// Use sdk.help() to see more details.

function onMount() {
  sdk.notifications.show({
    title: 'file started ID: ' + sdk.component.fileId,
    text: 'haha'
  })
}

function onClick() {
  sdk.notifications.show({
    title: 'event type: ' + sdk.component.type,
    text: 'haha'
  })
}

`
        }
      ])
    setModalOpen({name:'newDocument', value: false})
  }


  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const parsedData:any = await readJsonFile(event.target.files[0])

      setDocument(parsedData.document)
      setFooter(parsedData.footer)
      setFiles(parsedData.files)
      setGraph(parsedData.graph)
      setGraphLock(parsedData.graphLock)
      setHistory(parsedData.history)
      setSettings(parsedData.settings)
      setLoadingView(parsedData.loadingView)
      setCommands(parsedData.commands)
      setCurrent(parsedData.current)
      setElements(parsedData.elements)
      setContextElementId(parsedData.contextElementId)

      setLayout({
        ...parsedData.layout,
        modal: {
          ...parsedData.layout.modal,
          open: {
            ...parsedData.layout.open,
            export: false
          }
        }
      })

    }
  }

  return (
    <Dialog
      open={isOpenedNewDocumentModal}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Document</DialogTitle>
        </DialogHeader>
        <div className="mt-1">
          <form onSubmit={handleSubmit}>
            <Label className="block mb-3">Name:</Label>
            <Input ref={titleRef} required className="mb-4" />
            <Label className="block mb-3">Description:</Label>
            <Textarea ref={descriptionRef} rows={5} className="mb-4" />
            <div className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => inputFileRef.current?.click()}>Import</Button>
              <Button type="submit" variant="default">Create</Button>
              <input type="file" accept=".json,application/json" ref={inputFileRef} className="hidden" onChange={onChange} />
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}