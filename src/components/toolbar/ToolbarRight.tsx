import Actions from '../general/Actions'
import Properties from '../window/Properties'
import Layers from '../window/Layers'
import History from '../window/History'
import useToolbar from '../../hooks/useToolbar'
import { useState } from 'react'
import mountToolbarActions from '../../utils/mountToolbarActions'
import CONSTANTS from '../../constants'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


import Icon from '../general/Icon'

export default function ToolbarRight() {
  const [opened, setOpen] = useState('0')

  const {
    toggleOpenRight,
    showVerticalRight,
    isRightOpen
  } = useToolbar()

  const setOpenNumber = (value: number) => {
    toggleOpenRight();
    setOpen(String(value));
  }

  const toolbarVerticalRight = mountToolbarActions(
    CONSTANTS.toolbar.right,
    {
      properties: {
        onClick: () => setOpenNumber(0),
        component: <Properties />
      },
      layers: {
        onClick: () => setOpenNumber(1),
        component: <Layers />
      },
      history: {
        onClick: () => setOpenNumber(2),
        component: <History />
      },
    }
  )

  if(!showVerticalRight) {
    return <div />
  }

  return (
    <div className={`toolbarContainer vertical bg-background`}>
      {!isRightOpen ? (
        <Actions vertical data={toolbarVerticalRight}/>
      ) : (
        <div className="toolbarRightGroup">

          <Accordion type="single" value={String(opened)} collapsible>
            {toolbarVerticalRight.map((item, index:number) => (
              <AccordionItem key={String(index)} value={String(index)} className={String(index)===opened ? "border-0" : ''}>
                <AccordionTrigger
                  className="bg-muted h-7 px-2"
                  onClick={() => {
                    if(String(index)===opened) {
                      toggleOpenRight()
                    } else {
                      setOpen(String(index))
                    }
                  }}
                >
                  <div className="flex flex-row">
                    <Icon name={item.icon} label={item.label}/>
                    <span className="ml-2">{item.label}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className={`toolbarRightBox`}>
                    {item.component}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  )
}
