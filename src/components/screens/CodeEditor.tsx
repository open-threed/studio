import { Editor, useMonaco } from '@monaco-editor/react'
import { IconX } from '@tabler/icons-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import getEditorLang from '../../utils/getEditorLang'
import useCodeEditor from '../../hooks/useCodeEditor'
import { useCommandsStore } from '../../store/commands'
import { Button } from '@/components/ui/button'

function EmptyScreen() {
  const { commands } = useCommandsStore()

  return (
    <div className="w-[500px] mx-auto my-60">
      {commands.map((item, index) => (
        <div key={index}  className="flex justify-center space-x-2 mb-3">
          <span className=" opacity-50">{item.label}</span>
          <div>
            {item.data.map((subitem, subindex) => (
              <span key={subindex}>
               {subindex === 0 ? '' : ' + '}
                <kbd className="px-1.5 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">{subitem}</kbd>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function CodeEditor() {
  const {
    openedObjects,
    closeFile,
    updateCode,
    openFile
  } = useCodeEditor()

  const monaco = useMonaco()
  monaco?.editor.defineTheme('my-theme', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#000000',
      'minimap.background': '#060606',
    },
  });


  if(openedObjects.length < 1) {
    return <EmptyScreen />
  }

  return (
    <div className="h-full">
      <Tabs value={openedObjects.filter((item) => item.selected)[0]?.id} className="h-full bg-transparent">
        <TabsList className="bg-transparent m-1">
          {openedObjects.map((item) => (
            <TabsTrigger asChild key={`tab-${item.id}`} value={item.id} className={`mr-2 ${item.id === openedObjects.filter((item) => item.selected)[0]?.id ? 'border' : ''}`}>
              <>
                <div onClick={() => openFile(item.id)}>{item.name}</div>
                <Button
                  onClick={() => closeFile(item.id)}
                  variant="ghost"
                  className="ml-2 p-0 h-3 w-3"
                >
                  <IconX />
                </Button>
              </>
            </TabsTrigger>
          ))}
        </TabsList>
        {openedObjects.map((item) => (
          <TabsContent key={`panel-${item.id}`} value={item.id} className="h-full">
            <Editor
              defaultLanguage={getEditorLang(item)}
              theme="my-theme"
              defaultValue={item.content}
              onChange={(e) => updateCode(item.id, e)}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}