import useModal from "../../hooks/useModal"
import { JSONTree } from 'react-json-tree'
import CONSTANTS from "../../constants"
import { useDocumentStore } from "../../store/document"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useFilesStore } from "@/store/files"
import { useGraphStore } from "@/store/graph"
import { useLayoutStore } from "@/store/layout"
import { useHistoryStore } from "@/store/history"
import { useSettingsStore } from "@/store/settings"
import { useCommandsStore } from "@/store/commands"
import { useElementsStore } from "@/store/elements"

export default function ModalExport() {
  const { isOpenedExportModal, closeExportModal } = useModal()
  const { document: documentStore } = useDocumentStore()
  const { files } = useFilesStore()
  const { graph, graphLock } = useGraphStore()
  const { layout, footer } = useLayoutStore()
  const { history } = useHistoryStore()
  const { loadingView, settings } = useSettingsStore()
  const { commands } = useCommandsStore()
  const { elements, current, contextElementId } = useElementsStore()

  const data = {
    document: documentStore,
    files,
    graph,
    graphLock,
    layout,
    footer,
    history,
    loadingView,
    settings,
    commands,
    elements,
    current,
    contextElementId,
  }

  function download(){
    const element = document.createElement("a");
    const textFile = new Blob([JSON.stringify(data, null, 2)]);
    element.href = URL.createObjectURL(textFile);
    element.download = `${documentStore.title}-${Date.now()}-threed-studio.json`;
    document.body.appendChild(element); 
    element.click();
  }

  return (
    <Dialog
      open={isOpenedExportModal}
      onOpenChange={closeExportModal}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] mt-1">
          <div className="bg-black p-2 rounded border mb-5">
            <JSONTree data={data} theme={CONSTANTS.tree_theme} />
          </div>
          <Button onClick={download}>Download</Button>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
