import { IconFileMusic } from "@tabler/icons-react"
import CONSTANTS from "../../constants"
import { useElementsStore } from "../../store/elements"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { ScrollArea } from "@/components/ui/scroll-area"

export default function InputSound() {
  const { current, updateCurrent } = useElementsStore()

  function handleChange(value:string) {
    updateCurrent({
      soundUrl: value
    })
  }

  return (
    <>
      <Popover>
        <PopoverTrigger className="w-full" asChild>
          <Button variant="outline" className="w-full">
            <IconFileMusic size="1rem" className="mr-1" />
            <span className="capitalize">
              {current?.soundUrl.split('/')[current?.soundUrl.split('/').length-1]?.replaceAll('-', ' ')}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" className="p-0 w-100">
          <ScrollArea className="h-[300px] w-[300px] p-4">
            <div>
              <div className="grid grid-cols-2 gap-4">
                {CONSTANTS.sounds.map((item:string) => (
                  <div key={item}>
                    <div
                      className="h-full p-2 text-center flex items-center flex-col shadow-sm cursor-pointer border rounded-sm"
                      onClick={() => handleChange(item)}
                    >
                      <IconFileMusic size="3rem" />
                      <p className="text-xs capitalize">
                        {item?.replaceAll('-', ' ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </>
  )
}