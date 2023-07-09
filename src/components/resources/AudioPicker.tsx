import CONSTANTS from "@/constants"
import { useElementsStore } from "@/store/elements"
import { IconMusic } from "@tabler/icons-react"

export default function AudioPicker() {
  const { current, updateElement } = useElementsStore()

  const handleChange = (value:string) => {
    updateElement({
      id: current.id,
      soundUrl: value
    })
  }

  if(!current || !current.soundUrl) {
    return null
  }

  return (
    <div className="mb-10">
      <div className="grid grid-cols-2 gap-4">
        {CONSTANTS.sounds.map((item:string) => (
          <div key={item}>
            <div className={`p-2 text-center border rounded-sm cursor-pointer bg-cover`}
              onClick={() => handleChange(item)}
              style={{
                borderColor: current.soundUrl !== item ?'#1d283a':'white'
              }}>
              <div className="rounded-full flex items-center justify-center border bg-muted w-20 h-20 mx-auto">
                <IconMusic />
              </div>

              <p className="text-xs mt-2 bg-black">{item}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}