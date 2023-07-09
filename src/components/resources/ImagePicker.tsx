import CONSTANTS from "@/constants"
import { useElementsStore } from "@/store/elements"

const images = [
  'react-threejs.png',
  'threejs-react.png',
]

export default function ImagePicker() {
  const { current, updateElement } = useElementsStore()

  const handleChange = (value:string) => {
    updateElement({
      id: current.id,
      file: value
    })
  }

  if(!current || !current.file) {
    return null
  }

  return (
    <div className="mb-10">
      <div className="grid grid-cols-2 gap-4">
        {images.map((item:string) => (
          <div key={item}>
            <div className={`p-2 text-center border rounded-sm cursor-pointer bg-cover`}
              onClick={() => handleChange(item)}
              style={{
                borderColor: current.file !== item ?'#1d283a':'white'
              }}>
              <img className="rounded-full w-20 h-20 mx-auto" src={`${CONSTANTS.cdn}/images/${item}`} />

              <p className="text-xs mt-2 bg-black">{item}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}