import CONSTANTS from "@/constants"
import { useElementsStore } from "@/store/elements"

export default function MaterialPicker() {
  const { current, updateElement } = useElementsStore()

  const handleChange = (value:string) => {
    updateElement({
      id: current.id,
      material_type: value
    })
  }

  const isDisable = (value: string) => JSON.stringify(CONSTANTS.materials[value]) === '{}'

  if(!current || !current.material_type) {
    return null
  }

  return (
    <div className="mb-10">
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(CONSTANTS.materials).filter((itm) => !isDisable(itm)).map((item:string) => (
          <div key={item}>
            <div className={`relative p-2 text-center border rounded-sm cursor-pointer bg-cover`}
              onClick={() => handleChange(item)}
              style={{
                borderColor: current.material_type !== item ?'#1d283a':'white'
              }}>
              <img className="rounded-full bg-muted w-20 h-20 mx-auto" src={`${CONSTANTS.cdn}/material_type/${item}.jpg`} />
              <p className="text-xs mt-2 bg-black">{item}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}