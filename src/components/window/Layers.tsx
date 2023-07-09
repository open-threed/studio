import { IconCopyOff } from '@tabler/icons-react'
import { useElementsStore } from '../../store/elements'
import elementsBase from '@/elements'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Icon from '../general/Icon'
import { Button } from '@/components/ui/button'

function TooltipCopy() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <IconCopyOff size="0.8rem" stroke={1.5} />
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Unique element cannot be duplicated</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default function Layers() {
  const { elements, current, setCurrent } = useElementsStore()

  return (
    <>
      {elements.map((element, index: number) => (
        <Button
          key={index}
          disabled={current?.id === element.id}
          variant={current?.id === element.id ? 'default' : "outline"}
          onContextMenu={(e)=> {
            e.preventDefault()
            console.log('Right click');
          }}
          className="w-full mb-2 bg-muted text-white"
          onClick={() => {
            if(current?.id === element.id) {
              setCurrent(null)
            } else {
              setCurrent(element)
            }
          }}
        >
          <div className="mr-2">
            <Icon name={elementsBase[element.type].icon} />
          </div>
          {element.type}
          {!element.editable && <TooltipCopy />}
        </Button>
      ))}
    </>
  )
}