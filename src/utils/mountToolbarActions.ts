import { GenericType } from "@/types"

type OnClickType = () => void

type ActionItem = {
  [name: string]: {
    onClick: OnClickType | null
    component?: React.ReactElement
    icon?: string
    active?: boolean
  }
}

export default function mountToolbarActions(
  toolbar: GenericType[],
  actions: ActionItem
) {
  return toolbar.map((item) => ({
    ...item,
    ...actions[item.id],
    options: !item.options?.length ? null :item.options?.map((subItem: GenericType) => ({
      ...subItem,
      ...actions[subItem.id]
    }))
  }))
}