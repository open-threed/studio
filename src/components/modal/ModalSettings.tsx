import useModal from "../../hooks/useModal";
import PropertiesForm from "../form/PropertiesForm";
import { useSettingsStore } from '../../store/settings'
import { useDocumentStore } from "../../store/document";
import { useLayoutStore } from "../../store/layout";
import { DocumentType, SettingsType } from "../../constants";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge";

function TabGeneral() {
  const {settings, setTheme} = useSettingsStore()

  return (
    <>
      <div className="h-4" />
        <div className="p-4 mb-5 bg-black border rounded">
        <PropertiesForm
          initialObject={{theme: settings.theme}}
          onChange={(value:SettingsType) => setTheme(value.theme)}
        />
      </div>
    </>
  )
}

function TabDocument() {
  const { document, updateDocument } = useDocumentStore()
  const { title, description } = document

  return (
    <>
      <div className="h-4" />
        <div className="p-4 mb-5 bg-black border rounded">
        <PropertiesForm
          initialObject={{ title, description }}
          onChange={(value:DocumentType) => updateDocument({...value})}
        />
      </div>
    </>
  )
}

function TabAdvanced() {
  const { settings, setSettings } = useSettingsStore()
  const { layout } = useLayoutStore()

  const {
    theme,
    performanceMonitor,
    tool,
    ...restOfSettings
  } = settings

  return (
    <>
      <div className="h-4" />
      <div className="p-4 mb-5 bg-black border rounded">
        <Badge className="mb-4">General</Badge>
        <PropertiesForm
          onChange={(value:SettingsType) => setSettings({ ...settings, ...value })}
          initialObject={restOfSettings}
        />
      </div>
      <div className="p-4 mb-5 bg-black border rounded">
        <Badge className="mb-4">Performance Monitor:</Badge>
        <PropertiesForm
          onChange={(value:SettingsType) => setSettings({ ...settings, performanceMonitor: { ...settings.performanceMonitor, ...value } })}
          initialObject={performanceMonitor}
        />
      </div>
      <div className="p-4 mb-5 bg-black border rounded">
        <Badge className="mb-4">Tool:</Badge>
        <PropertiesForm
          onChange={() => null}
          initialObject={tool}
        />
      </div>
      <div className="p-4 mb-5 bg-black border rounded">
        <Badge className="mb-4">Toolbar:</Badge>
        <PropertiesForm
          onChange={() => null}
          initialObject={layout.toolbar}
        />
      </div>
      <div className="p-4 mb-5 bg-black border rounded">
        <Badge className="mb-4">Modal:</Badge>
        <PropertiesForm
          onChange={() => null}
          initialObject={layout.modal}
        />
      </div>
      <div className="h-4" />
    </>
  )
}

export default function ModalSettings() {
  const { isOpenedSettingsModal, closeSettingsModal } = useModal()
  return (
    <Dialog
      open={isOpenedSettingsModal}
      onOpenChange={closeSettingsModal}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Document</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] mt-1">
          <Tabs defaultValue="general">
            <TabsList>
              <TabsTrigger value="general">
                General
              </TabsTrigger>
              <TabsTrigger value="document">
                Document
              </TabsTrigger>
              <TabsTrigger value="advanced">
                Advanced
              </TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <TabGeneral />
            </TabsContent>
            <TabsContent value="document">
              <TabDocument />
            </TabsContent>
            <TabsContent value="advanced">
              <TabAdvanced />
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}