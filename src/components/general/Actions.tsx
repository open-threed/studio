import Icon from './Icon'
import { Button } from "@/components/ui/button"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from '../ui/scroll-area'
import { ActionItemType } from '@/types'

type ActionsProps = {
  data: ActionItemType[]
  vertical?: boolean
}

type ActionItemProps = {
  item: ActionItemType
  vertical?: boolean
  index: number
}

type ActionIconOptionsType = {
  onClick: () => void
  disabled: boolean
  variant: 'outline' | 'link'
}

function ActionItem({ item, vertical, index }: ActionItemProps) {
  const options = item.options || []

  const actionIconOptions: ActionIconOptionsType = {
    onClick: item.onClick,
    disabled: item.disabled,
    variant: item.active ? 'outline': 'link',
  }

  function renderComponent() {
    return (
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`actionsActionContainer ${vertical ? 'vertical' : ''} ${index === 0 ? 'initial' : ''}`} style={item.style}>
              <Button {...actionIconOptions} className="h-7 w-7 p-0">
                <Icon name={item.icon} label={item.label} />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent side={vertical? 'left' : 'bottom'}>
            <p>{item.label}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    )
  }

  if(!options.length) {
    return renderComponent()
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {renderComponent()}
      </PopoverTrigger>
      <PopoverContent side="right" className="p-0 pr-2 w-100">
        <ScrollArea className={`${options.length>=6 && 'h-60'}`}>
          <div className="actionsPopoverContainer">
            <div>
              <div>
                {options.map((subitem: ActionItemType, subindex: number) => (
                  <div key={subindex} onClick={subitem.onClick}>
                    <div>
                      <Button {...actionIconOptions}>
                        <Icon name={subitem.icon} />
                        <span className="ml-2">{subitem.label}</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

export default function Actions({ data, vertical }: ActionsProps) {
  return (
    <>
      {data.map((item, index) => (
        <ActionItem
          key={item.icon}
          item={item}
          vertical={vertical}
          index={index}
        />
      ))}
    </>
  )
}
