import { useCommandsStore } from '../../store/commands'
import useModal from '../../hooks/useModal'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ModalCommands() {
  const { isOpenedCommandsModal, closeCommandsModal } = useModal()
  const { commands } = useCommandsStore()

  return (
    <Dialog
      open={isOpenedCommandsModal}
      onOpenChange={closeCommandsModal}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Commands</DialogTitle>
        </DialogHeader>
        <div className="mt-1">
          {commands.map((item, index) => (
            <div className="flex space-x-3 mb-3" key={index}>
              <span>{item.label}</span>
              <div>
                {item.data.map((subitem, subindex) => (
                  <span key={subindex}>
                    {subindex === 0 ? '' : ' + '}
                    <kbd className="px-1.5 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                      {subitem}
                    </kbd>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}