import MaterialPicker from "./MaterialPicker";
import TexturePicker from "./TexturePicker";
import CodePicker from "./CodePicker";
import EnvironmentPicker from "./EnvironmentPicker";
import ImagePicker from "./ImagePicker";
import AudioPicker from "./AudioPicker";
import { useSettingsStore } from "@/store/settings";
import { Button } from "../ui/button";
import { IconArrowLeft } from "@tabler/icons-react";

export default function Resources() {
  const {settings, setPicker} = useSettingsStore()

  if(settings.picker === '') {
    return null
  }
  
  return (
    <div>
      <div className="flex items-center mb-3">
        <Button onClick={() => setPicker('')} className="h-7 w-7 p-0">
          <IconArrowLeft size="1rem" />
        </Button>
        <h3 className="text-[20px] ml-3 capitalize">{settings.picker}</h3>
      </div>
      {(settings.picker === 'material') && <MaterialPicker />}
      {(settings.picker === 'texture') && <TexturePicker />}
      {(settings.picker === 'code') && <CodePicker />}
      {(settings.picker === 'environment') && <EnvironmentPicker />}
      {(settings.picker === 'image') && <ImagePicker />}
      {(settings.picker === 'audio') && <AudioPicker />}
    </div>
  )
}