import { useEffect } from 'react'
import { IconLayout } from '@tabler/icons-react'
import { ReactFlowProvider } from 'reactflow'

import useToolbar from '../hooks/useToolbar'
import useModal from '../hooks/useModal'
import usePlayer from '../hooks/usePlayer'
import useKeyboardListener from '../hooks/useKeyboardListener'
import useStorageProvider from '../hooks/useStorageProvider'

import ModalNewDocument from './modal/ModalNewDocument'
import ModalSettings from './modal/ModalSettings'
import ModalHub from './modal/ModalHub'
import ModalExport from './modal/ModalExport'
import ModalCommands from './modal/ModalCommands'
import ModalTerms from './modal/ModalTerms'
import ModalNewFile from './modal/ModalNewFile'
import ModalSearch from './modal/ModalSearch'

import CodeEditor from './screens/CodeEditor'
import Graph from './screens/Graph'
import Mesa from './screens/Mesa'

import Layout from './general/Layout'
import LogContainer from './window/LogContainer'
import MediaMaker from './window/MediaMaker'
import ContextMenu from './general/ContextMenu'
import { useSettingsStore } from '../store/settings'
import { useDocumentStore } from '../store/document'
import { useLayoutStore } from '../store/layout'

import { TooltipProvider } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import Notifications from './general/Notifications'

function Footer() {
  const { footer } = useLayoutStore()
  const { isPlayerScreen } = usePlayer()

  if(!footer || isPlayerScreen) {
    return null
  }

  return  (
    <div className=" h-[300px] bg-black w-full overflow-y-auto">
      {footer === 'log' && (
        <LogContainer/>
      )}
      {footer === 'studio' && (
        <MediaMaker/>
      )}
    </div>
  )
}

export default function App() {
  const { toggleShowTop, showHorizontalTop } = useToolbar()
  const { isPlayerScreen } = usePlayer()
  const { openNewDocumentModal } = useModal()
  const { isLoading } = useStorageProvider()
  const { settings } = useSettingsStore()
  const { document } = useDocumentStore()
  const { footer } = useLayoutStore()
  useKeyboardListener()

  useEffect(() => {
    if (!document.title) {
      openNewDocumentModal()
    }
  }, [])

  if(isLoading) {
    return (
      <div className="loading-page">
        <div className="lds-ripple">
          <div />
          <div />
        </div>
      </div>
    )
  }

  const hasDocument = document.title
  const isCodeScreen = (settings.main === 'code') && !isPlayerScreen
  const isVisualScreen = (settings.main === 'view') || isPlayerScreen
  const isGraphScreen = (settings.main === 'graph') && !isPlayerScreen
  const hasFullscreenButton = (!showHorizontalTop && !isPlayerScreen)

  function render() {
    return (
      <>
        <div className={`overflow-hidden ${isCodeScreen?'h-full':'h-0'}`}><CodeEditor /></div>
        <div className={`overflow-hidden ${isGraphScreen?'h-full':'h-0'}`}><Graph /></div>
        <div className={`overflow-hidden ${isVisualScreen?'h-full':'h-[200px] w-[300px] absolute bottom-5 right-5 border'}`}><Mesa /></div>
      </>
    )
  }

  return (
    <ReactFlowProvider>
      <TooltipProvider>

        {hasDocument && (
          <Layout>
            <div className={`relative ${footer && !isPlayerScreen ? 'h-[calc(100%-300px)]' : 'h-full'}`}>
              {render()}
              <Footer />
            </div>
          </Layout>
        )}

        {hasFullscreenButton && (
          <div className="floatButton">
            <Button className="h-7 w-7 p-0" variant="outline" onClick={toggleShowTop}>
              <IconLayout size="1rem" />
            </Button>
          </div>
        )}


        <Notifications />

        <ModalNewDocument />
        <ModalSettings />
        <ModalHub />
        <ModalExport />
        <ModalCommands />
        <ModalTerms />
        <ModalNewFile />
        <ModalSearch />

        {!isPlayerScreen && (
          <ContextMenu />
        )}

      </TooltipProvider>
    </ReactFlowProvider>
  )
}
