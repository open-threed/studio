export type GenericType = any

export type ObjectType = {
  [key: string]: GenericType
}

export type InputEvent = GenericType
export type BasePropertiesFormSelects = GenericType
export type InputValueType = GenericType
export type ReactThreeElement = GenericType
export type ElementProps = GenericType
export type MeshRefHelper = GenericType
export type useGLTFType = GenericType
export type ElementType = GenericType
export type Graph = GenericType
export type ActionItemType = GenericType
export type MatetialType = GenericType
export type PropertiesFormSelectOption = GenericType
export type IconType = GenericType
export type MaterialType = GenericType
export type JsonMaterialsType = GenericType

export interface File {
  id: string
  name: string
  content?: string
  opened?: boolean
  selected?: boolean
  children?: File[]
}
