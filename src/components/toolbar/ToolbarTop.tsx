import Actions from '../general/Actions';

import {
  IconSettings,
  IconMenu,
  IconSearch,
  IconPhoto,
  IconMessageCircle
} from '@tabler/icons-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import useModal from '../../hooks/useModal';
import useToolbar from '../../hooks/useToolbar';
import usePlayer from '../../hooks/usePlayer';
import mountToolbarActions from '../../utils/mountToolbarActions';
import CONSTANTS from '../../constants';
import { useSettingsStore } from '../../store/settings';
import { useDocumentStore } from '../../store/document';
import { useElementsStore } from '../../store/elements';
import clearLocalStorage from '../../utils/clearLocalStorage';

export default function ToolbarTop() {
  const { goPlayerScreen } = usePlayer()
  const { settings, setView, setLoadingView } = useSettingsStore()
  const { document } = useDocumentStore()
  const { current, setCurrent } = useElementsStore()

  const {
    openSettingsModal,
    openExportModal,
    openCommandsModal,
    openTermsModal,
  } = useModal()

  const {
    toggleShowTop,
    toggleShowRight,
    toggleShowBottom,
    toggleShowLeft,
    showHorizontalTop,
  } = useToolbar()

  const toolbarHorizontalTopEnd = mountToolbarActions(CONSTANTS.toolbar.top, {
    play: { onClick: goPlayerScreen },
    toggle_left_toolbar: { onClick: toggleShowLeft },
    toggle_bottom_toolbar: { onClick: toggleShowBottom },
    toggle_right_toolbar: { onClick: toggleShowRight },
    fullscreen: { onClick: toggleShowTop },
  })

  function selectTab(value:string) {
    setView(value)
    setCurrent(
      !current ? null : { ...current, object: null }
    )
  }

  function reset() {
    clearLocalStorage()
    window.location.href = '/'
  }

  if(!showHorizontalTop) {
    return <div />
  }

  return (
    <div className={`toolbarContainer bg-background`}>
      <>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-7 w-7 p-0"
              variant="link"
            >
              <IconMenu size="1rem" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-background min-w-[170px]">
            <DropdownMenuItem onClick={reset} className="cursor-pointer">
              <IconSettings size={14} className="mr-2" />
              New document
            </DropdownMenuItem>
            <DropdownMenuItem onClick={openCommandsModal} className="cursor-pointer">
              <IconSearch size={14} className="mr-2" />
              Commands
            </DropdownMenuItem>
            <DropdownMenuItem onClick={openSettingsModal} className="cursor-pointer">
              <IconSettings size={14} className="mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={openExportModal} className="cursor-pointer">
              <IconMessageCircle size={14} className="mr-2" />
              Export
            </DropdownMenuItem>
            <DropdownMenuItem onClick={openTermsModal} className="cursor-pointer">
              <IconPhoto size={14} className="mr-2" />
              Terms
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <p className=" m-0 pl-2 pr-3 h-[28px] w-[310px] overflow-hidden leading-6">
          <small>
            {document.title}
          </small>
        </p>
        <div className="flex flex-1"/>
          <div className="mt-0.5" >
            <Tabs value={settings.main} className="w-[400px]">
              <TabsList className="h-6">
                <TabsTrigger value="view" className="h-4 text-xs" onClick={()=>{
                  setLoadingView(true)
                  selectTab('view')
                  setTimeout(() => {
                    setLoadingView(false)
                  }, 300);
                }}>Visual</TabsTrigger>
                <TabsTrigger value="graph" className="h-4 text-xs" onClick={()=>selectTab('graph')}>Graph</TabsTrigger>
                <TabsTrigger value="code" className="h-4 text-xs" onClick={()=>selectTab('code')}>Code</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        <div className="flex flex-1"/>
        <Actions data={toolbarHorizontalTopEnd}/>
      </>
    </div>
  );
}
