import { useState } from 'react';
import { SketchPicker } from 'react-color';

import SelectMaterial from './SelectMaterial';
import InputSound from './InputSound';
import InputTexture from './InputTexture';
import { useFilesStore } from '../../store/files';

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

import CodeEditor from '@uiw/react-textarea-code-editor';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  InputEvent,
  InputValueType,
  ObjectType,
  PropertiesFormSelectOption
} from '@/types';

function isJsonString(str:string) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

function onlyNumbers(array:InputValueType[]) {
  if(!Array.isArray(array)) {
    return false
  }
  return array.every((element:InputValueType) => {
    return typeof element === 'number';
  });
}

function isObject(value:InputValueType) {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  );
}

type BasePropertiesFormSelects = {
  [key: string]: PropertiesFormSelectOption[]
}

type BasePropertiesFormProps = {
  item: ObjectType
  sub?: boolean
  onChange: (e: InputEvent) => void
  hideOptions?: string[]
  selects?: BasePropertiesFormSelects
}

function BasePropertiesForm({
  item,
  sub = false,
  onChange = () => null,
  hideOptions = [],
  selects = {}
}: BasePropertiesFormProps) {
  const myselects = Object.keys(selects)
  const { files } = useFilesStore()
  const [colorPickerOpen, setColorPickerOpen] = useState(false)

  if(hideOptions?.find((tag:string) => item.id.includes(tag))) {
    return null
  }

  if (myselects.includes(item.id)) {
    return (
      <div className="mb-5" key={item.id}>
        <Label htmlFor={item.id} className="capitalize">
          {item.id}
        </Label>
        <Select
          onValueChange={(e) => onChange(e)}
          value={item.value}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a file" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {selects[item.id].map(({value, label}, index:number) => (
                <SelectItem key={index} value={value}>{label}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    )
  }

  if (item.id === 'intensity' || item.id === 'decay') {
    return (
      <div className="mb-5" key={item.id}>
        <Label className="capitalize">
          {item.id}
        </Label>
        <Slider
          onChange={(e) => onChange(Number(e).toFixed(2))}
          // defaultValue={item.value}
          step={0.01}
          min={0}
          max={5}
        />
      </div>
    )
  }
  if (item.id === 'distance') {
    return (
      <div className="mb-5" key={item.id}>
        <Label className="capitalize">
          {item.id}
        </Label>
        <Slider
          onChange={(e) => onChange(Number(e).toFixed(2))}
          // defaultValue={item.value}
          step={0.1}
          min={0}
          max={10}
        />
      </div>
    )
  }

  if (item.id === 'material_type') {
    return (
      <div className="mb-5" key={item.id}>
        <Label className="capitalize">
          {item.id}
        </Label>
        <SelectMaterial />
      </div>
    )
  }

  if (item.id === 'texture') {
    return (
      <div className="mb-5" key={item.id}>
        <Label className="capitalize">
          {item.id}
        </Label>
        <InputTexture />
      </div>
    )
  }

  if (item.id === 'soundUrl') {
    return (
      <div className="mb-5" key={item.id}>
        <Label className="capitalize">
          {item.id}
        </Label>
        <InputSound />
      </div>
    )
  }

  if(onlyNumbers(item.value)) {
    return (
      <div className="mb-5" key={item.id}>
        <Label className="capitalize">
          {item.id}
        </Label>
        <div className="flex flex-row space-x-2">
          {item.value.map((sub:InputValueType, index:number) => (
            <Input
              key={index}
              type="number"
              autoComplete="off"
              placeholder="0"
              value={sub}
              onChange={(e) => onChange([...item.value.map((a:InputValueType, i:number) => i===index?Number(e.target.value)||0:a)])}
              className="w-1/4 mt-1"
            />
          ))}
        </div>
      </div>
    )
  }

  if(item.id === 'fileId') {
    return (
      <div className="mb-5" key={item.id}>
        <Label htmlFor={item.id} className="capitalize">
          {item.id}
        </Label>
        <Select value={item.value} onValueChange={(e) => onChange(e)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a file" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {files.map(({id, name}, index) => (
                <SelectItem key={index} value={id}>{name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    )
  }

  if(item.id === 'color') {
    return (
      <div className="mb-5" key={item.value}>
        <Label className="capitalize">
          {item.id}
        </Label>
        <Popover open={colorPickerOpen} onOpenChange={setColorPickerOpen}>
          <PopoverTrigger className="w-full" onClick={() => setColorPickerOpen(!colorPickerOpen)}>
            <Input value={item.value} />
          </PopoverTrigger>
          <PopoverContent side="left" className="p-0 w-100 mr-6">
            <SketchPicker
              color={item.value}
              onChangeComplete={(e) => onChange(e.hex)}
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  }

  if(typeof item.value === 'boolean') {
    return (
      <div className="flex items-center space-x-2 mb-5" key={item.id}>
        <Checkbox
          defaultChecked={item.value}
          onCheckedChange={(e) => onChange(e)}
          id={item.id}
        />
        <label
          htmlFor={item.id}
          className="capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {item.id}
        </label>
      </div>
    )
  }

  if(typeof item.value === 'number') {
    return (
      <div className="mb-5" key={item.id}>
        <Label htmlFor={item.id} className="capitalize">
          {item.id}
        </Label>
        <Input
          type="number"
          autoComplete="off"
          id={item.id}
          placeholder="0"
          value={item.value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mt-1"
        />
      </div>
    )
  }

  if(JSON.stringify(item.value) === '{}') {
    return (
      <div className="mb-5" key={item.id}>
        <Label className="capitalize">
          {item.id}
        </Label>
        <CodeEditor
          value={JSON.stringify(item.value, null, 2)}
          onChange={(e) => {
            if(isJsonString(e.target.value)) {
              onChange(JSON.parse(e.target.value))
            }
          }}
          language="json"
          padding={15}
        />
      </div>
    )
  }

  if(isObject(item.value)) {
    if(sub) {
      return (
        <div className="mb-5" key={item.id}>
          <Label className="capitalize">
            {item.id}
          </Label>
          <CodeEditor
            value={JSON.stringify(item.value, null, 2)}
            onChange={(e) => {
              if(isJsonString(e.target.value)) {
                onChange(JSON.parse(e.target.value))
              }
            }}
            language="json"
            padding={15}
          />
        </div>
      )
    }
    return null
  }

  return (
    <div className="mb-5" key={item.id}>
      <Label htmlFor={item.id} className="capitalize">
        {item.id}
      </Label>
      <Input
        type="text"
        autoComplete="off"
        id={item.id}
        value={item.value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1"
      />
    </div>
  )
}

function convertObjectToArray(obj: ObjectType, parentId = '') {
  const result: ObjectType[] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const id = parentId ? `${parentId}.${key}` : key;

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        result.push(...convertObjectToArray(value, id));
      } else {
        result.push({ id, value });
      }
    }
  }

  return result;
}

function convertArrayToObject(arr: ObjectType[]) {
  const result: ObjectType = {};

  for (const item of arr) {
    const keys = item.id.split('.');
    let currentObj = result;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];

      if (!Object.prototype.hasOwnProperty.call(currentObj, key)) {
        currentObj[key] = {};
      }

      currentObj = currentObj[key];
    }

    const lastKey = keys[keys.length - 1];
    currentObj[lastKey] = item.value;
  }

  return result;
}

type PropertiesFormProps = {
  initialObject: ObjectType
  onChange: (e: InputEvent) => void
  hideOptions?: string[]
  selects?: BasePropertiesFormSelects
}

const PropertiesForm = ({ initialObject, onChange, hideOptions = [], selects = {} }: PropertiesFormProps) => {
  const values = convertObjectToArray(initialObject)

  const handleChange = (id:string) => (e: InputValueType) => {
    const news = values.map((vl) => {
      if(vl.id === id) {
        return ({ ...vl, value: e })
      }
      return vl
    })

    const resultObject = convertArrayToObject(news);
    onChange(resultObject)
  }

  return (
    <div>
      {values.map((item) => (
        <div key={item.id}>
          <BasePropertiesForm
            onChange={handleChange(item.id)}
            item={item}
            hideOptions={hideOptions}
            selects={selects}
          />
        </div>
      ))}
    </div>
  );
};

export default PropertiesForm;
