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

export default function ModalNewDocument() {
  const { isOpenedNewDocumentModal } = useModal()
  const { updateDocument } = useDocumentStore()
  const { setModalOpen } = useLayoutStore()
  const { updateFiles } = useFilesStore()
  
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
            <Button type="submit" variant="default">Create</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}