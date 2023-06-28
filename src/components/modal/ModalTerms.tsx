import useModal from "../../hooks/useModal";
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ModalTerms() {
  const { isOpenedTermsModal, closeTermsModal } = useModal()
  const textContent = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at expedita quibusdam illum consequatur cum aperiam, veniam asperiores labore laborum sint, aspernatur deleniti, beatae quae ab nulla harum nisi eligendi dolor sit amet, consectetur adipisicing elit. Assumenda at expedita quibusdam illum consequatur cum aperiam, veniam asperiores labore laborum sint, aspernatur deleniti, beatae quae ab nulla harum nisi amet, consectetur adipisicing elit. Assumenda at expedita quibusdam illum consequatur cum aperiam, veniam asperiores labore laborum sint, aspernatur deleniti, beatae quae ab nulla harum nisi eligendi dolor sit amet, consectetur adipisicing elit. Assumenda at expedita quibusdam illum consequatur cum aperiam, veniam asperiores labore laborum sint, aspernatur deleniti, beatae quae ab nulla harum nisi eligendi.\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at expedita quibusdam illum consequatur cum aperiam, veniam asperiores labore laborum sint, aspernatur deleniti, beatae quae ab nulla harum nisi eligendi dolor sit amet, consectetur adipisicing elit. Assumenda at expedita quibusdam illum consequatur cum aperiam, veniam asperiores labore laborum sint, aspernatur deleniti, beatae quae ab nulla harum nisi amet, consectetur adipisicing elit. Assumenda at expedita quibusdam illum consequatur cum aperiam, veniam asperiores labore laborum sint, aspernatur deleniti, beatae quae ab nulla harum nisi eligendi dolor sit amet, consectetur adipisicing elit. Assumenda at expedita quibusdam illum consequatur cum aperiam, veniam asperiores labore laborum sint, aspernatur deleniti, beatae quae ab nulla harum nisi eligendi.\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at expedita quibusdam illum consequatur cum aperiam, veniam asperiores labore laborum sint, aspernatur deleniti, beatae quae ab nulla harum nisi eligendi dolor sit amet, consectetur adipisicing elit. Assumenda at expedita quibusdam illum consequatur cum aperiam, veniam asperiores labore laborum sint, aspernatur deleniti, beatae quae ab nulla harum nisi amet, consectetur adipisicing elit. Assumenda at expedita quibusdam illum consequatur cum aperiam, veniam asperiores labore laborum sint, aspernatur deleniti, beatae quae ab nulla harum nisi eligendi dolor sit amet, consectetur adipisicing elit. Assumenda at expedita quibusdam illum consequatur cum aperiam, veniam asperiores labore laborum sint, aspernatur deleniti, beatae quae ab nulla harum nisi eligendi.\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at expedita quibusdam illum consequatur cum aperiam, veniam asperiores labore laborum sint, aspernatur deleniti, beatae quae ab nulla harum nisi eligendi dolor sit amet, consectetur adipisicing elit. Assumenda at expedita quibusdam illum consequatur cum aperiam, veniam asperiores labore laborum sint, aspernatur deleniti, beatae quae ab nulla harum nisi amet, consectetur adipisicing elit. Assumenda at expedita quibusdam illum consequatur cum aperiam, veniam asperiores labore laborum sint, aspernatur deleniti, beatae quae ab nulla harum nisi eligendi dolor sit amet, consectetur adipisicing elit. Assumenda at expedita quibusdam illum consequatur cum aperiam, veniam asperiores labore laborum sint, aspernatur deleniti, beatae quae ab nulla harum nisi eligendi.`

  return (
    <Dialog
      open={isOpenedTermsModal}
      onOpenChange={closeTermsModal}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Document</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px]">
          <div className="pb-2">
            <p
              className="mb-3"
              dangerouslySetInnerHTML={{
                __html: textContent.replace(/\n/g, '<br/>')
              }}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}