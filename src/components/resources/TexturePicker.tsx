import CONSTANTS from "@/constants"
import { useElementsStore } from "@/store/elements"

export default function TexturePicker() {
  const { current, updateElement } = useElementsStore()

  const handleChange = (value:string) => {
    updateElement({
      id: current.id,
      texture: value
    })
  }

  if(!current || !current.texture) {
    return null
  }

  return (
    <div className="mb-10">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className={`p-2 text-center border rounded-sm cursor-pointer bg-cover`}
            onClick={() => handleChange('none')}
            style={{
              borderColor: current.texture !== 'none' ?'#1d283a':'white'
            }}>
            <div className="bg-muted rounded-full w-20 h-20 mx-auto" />
            <p className="text-xs mt-2 bg-black">none</p>
          </div>
        </div>
        {CONSTANTS.textures.map((item:string) => (
          <div key={item}>
            <div className={`p-2 text-center border rounded-sm cursor-pointer bg-cover`}
              onClick={() => handleChange(item)}
              style={{
                borderColor: current.texture !== item ?'#1d283a':'white'
              }}>
              <img className="rounded-full w-20 h-20 mx-auto" src={`${CONSTANTS.cdn}/textures/wood_board/${item}.jpg`} />

              <p className="text-xs mt-2 bg-black">{item}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}