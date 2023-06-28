import { useMouse } from '@mantine/hooks';
import { IconPhoto, IconMessageCircle } from '@tabler/icons-react';
import { useElementsStore } from '../../store/elements';
import { ElementType } from '../../types';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export default function ContextMenu() {
  const { x, y } = useMouse()
  const { elements, contextElementId, updateElements, setContextElementId, setCurrent } = useElementsStore()

  function handleClose() {
    setContextElementId(null)
  }

  if(!contextElementId) {
    return <div />
  }

  const remove = () => {
    updateElements([
      ...elements.filter((item: ElementType) => item.id !== contextElementId)
    ])
    setContextElementId(null)
    setCurrent(null)
  }

  return (

    <DropdownMenu open onOpenChange={handleClose}>
      <DropdownMenuTrigger>
        <div className="absolute" style={{ top: y, left: x }} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background min-w-[170px]">
        <DropdownMenuItem onClick={remove} className="cursor-pointer">
          <IconMessageCircle size={14} className="mr-2" />
          Duplicate element
        </DropdownMenuItem>
        <DropdownMenuItem onClick={remove} className="cursor-pointer">
          <IconPhoto size={14} className="mr-2" />
          Remove element
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}