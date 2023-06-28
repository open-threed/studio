import CONSTANTS from "../../constants"
import { useElementsStore } from "../../store/elements"
import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { ScrollArea } from "@/components/ui/scroll-area"

export default function InputTexture() {
  const { current, updateElement } = useElementsStore()

  const handleChange = (value:string) => {
    updateElement({
      id: current.id,
      texture: value
    })
  }

  return (
    <>
      <Popover>
        <PopoverTrigger className="w-full" asChild>
          <Button variant="outline" className="w-full">
            {current?.texture}
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" className="p-0 w-100">
          <ScrollArea className="h-[300px] w-[300px] p-4">
            <div>
              <div className="grid grid-cols-2 gap-4">
                {CONSTANTS.textures.map((item:string) => (
                  <div key={item}>
                    <div className={`p-2 text-center border rounded-sm cursor-pointer bg-cover`}
                      onClick={() => handleChange(item)}
                      style={{
                        backgroundImage: `url(${CONSTANTS.cdn}/textures/wood_board/${item}.jpg)`,
                        borderColor: current.texture !== item ?'transparent':'white'
                      }}>
                      <p className="text-xs mt-4 bg-black">{item}</p>
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