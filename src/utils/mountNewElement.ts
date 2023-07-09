import { nanoid } from 'nanoid'
import { ElementType } from '@/types'
import { elementsFull } from '@/elements'

export default function mountNewElement(type: string, props: ElementType) {
  return {
    ...elementsFull[type],
    id: nanoid(6),
    type: type,
    fileId: '',
    ...props
  }
}