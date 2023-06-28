import { FormEvent, useEffect, useRef } from "react";
import useModal from "../../hooks/useModal";
import { nanoid } from 'nanoid';
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

export default function ModalNewFile() {
  const { isOpeneNewFileModal, closeNewFileModal } = useModal()
  const { setModalOpen } = useLayoutStore()
  const { updateFiles } = useFilesStore()
  
  const titleRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setTimeout(() => {
      if(isOpeneNewFileModal && titleRef.current) {
        titleRef.current.focus()
      }
    }, 100)
  }, [isOpeneNewFileModal])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    updateFiles([
        {
          id: nanoid(6),
          name: titleRef.current?.value.split('.')[0]+'.js',
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

function onClick() {
  sdk.notifications.show({
    title: 'event type: ' + sdk.component.type,
    text: 'haha'
  })
}

`
        }
      ])

      setModalOpen({ name: 'newFile', value: false })

  }

  return (
    <Dialog
      open={isOpeneNewFileModal}
      onOpenChange={closeNewFileModal}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Document</DialogTitle>
        </DialogHeader>
        <div className="mt-1">
          <form onSubmit={handleSubmit}>
            <Input prefix=".js" ref={titleRef} required className="mb-3" />
            <Button type="submit">Create</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}