import { IconType } from '@/types'
import * as icons from '@tabler/icons-react'

type IconProps = {
  name: string
  label?: string
}

export default function Icon({ name }: IconProps) {
  const listIcons: IconType = icons
  const BaseIcon = listIcons[name] || icons.IconHelpCircle
  return (
    <BaseIcon size="1rem" />
  )
}