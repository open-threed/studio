import { useElementsStore } from "@/store/elements"
import { useFilesStore } from "@/store/files"
import { IconFile, IconFileOff } from "@tabler/icons-react"

export default function CodePicker() {
  const { current, updateElement } = useElementsStore()
  const { files } = useFilesStore()

  const handleChange = (value:string) => {
    updateElement({
      id: current.id,
      fileId: value
    })
  }

  if(!current) {
    return null
  }
  
  return (
    <div className="mb-10">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className={`p-2 text-center border rounded-sm cursor-pointer bg-cover`}
            onClick={() => handleChange('')}
            style={{
              borderColor: current.fileId !== '' ?'#1d283a':'white'
            }}>
            <div className="rounded-full bg-muted  flex items-center justify-center border w-20 h-20 mx-auto">
              <IconFileOff className="opacity-30" />
            </div>
            <p className="text-xs mt-2 bg-black opacity-50">none</p>
          </div>
        </div>
        {files.map((item) => (
          <div key={item.id}>
            <div className={`p-2 text-center border rounded-sm cursor-pointer bg-cover`}
              onClick={() => handleChange(item.id)}
              style={{
                borderColor: current.fileId !== item.id ?'#1d283a':'white'
              }}>
              <div className="rounded-full bg-muted flex items-center justify-center border w-20 h-20 mx-auto">
                <IconFile />
              </div>

              <p className="text-xs mt-2 bg-black">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}