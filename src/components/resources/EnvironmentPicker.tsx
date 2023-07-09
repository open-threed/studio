import CONSTANTS from "@/constants"
import { useElementsStore } from "@/store/elements"

export default function EnvironmentPicker() {
  const { current, updateElement } = useElementsStore()

  const handleChange = (value:string) => {
    updateElement({
      id: current.id,
      environment: value
    })
  }

  if(!current || !current.environment) {
    return null
  }

  return (
    <div className="mb-10">
      <div className="grid grid-cols-2 gap-4">
        {CONSTANTS.environment.map((item:string) => (
          <div key={item}>
            <div className={`p-2 text-center border rounded-sm cursor-pointer bg-cover`}
              onClick={() => handleChange(item)}
              style={{
                borderColor: current.environment !== item ?'#1d283a':'white'
              }}>
              <img className="rounded-full w-20 h-20 mx-auto" src={`${CONSTANTS.cdn}/environment/${item}.jpg`} />

              <p className="text-xs mt-2 bg-black">{item}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}