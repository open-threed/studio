import PropertiesForm from "./PropertiesForm"
import CONSTANTS from "../../constants"
import { useElementsStore } from "../../store/elements"
import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ScrollArea } from "@/components/ui/scroll-area"
import { MatetialType } from "@/types"

const options = Object
  .entries(CONSTANTS.materials)
  .filter((item) => JSON.stringify(item[1]) !== '{}')
  .map((item, index) => ({
    value: item[0],
    label: item[0],
    disabled: JSON.stringify(item[1]) === '{}',
    group: index>7? 'Basic' : 'Advanced'
  }))

export default function SelectMaterial() {
  const { current, updateElement } = useElementsStore()

  const handleChange = (value:string) => {
    updateElement({
      id: current.id,
      material_type: value,
      material: CONSTANTS.materials[value]
    })
  }

  const handleChangeMaterial = (value: MatetialType) => {
    updateElement({
      id: current.id,
      material: value
    })
  }

  return (
    <>
      <Popover>
        <PopoverTrigger className="w-full" asChild>
          <Button variant="outline" className="w-full">
            {current?.material_type}
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" className="p-0 w-100">
          <ScrollArea className="h-[300px] w-[300px] p-4">
            <div>
              <p className="text-xs">type:</p>
              <Select
                onValueChange={(e) => handleChange(e)}
                value={current?.material_type}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a file" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {options.map(({value, label}, index:number) => (
                      <SelectItem key={index} value={value}>{label}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <PropertiesForm
              initialObject={current?.material}
              onChange={(e) => handleChangeMaterial(e)}
              selects={{
                wireframeLinejoin:[
                  "round",
                  "bevel",
                  "miter"
                ],
                wireframeLinecap: [
                  "butt",
                  "round",
                  "square"
                ]
              }}
            />
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </>
  )
}