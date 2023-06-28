import { nanoid } from 'nanoid'
import CONSTANTS from '../constants'
import { ElementType } from '@/types'

export default function mountNewElement(type: string, props: ElementType) {
  return {
    ...CONSTANTS.elements[type],
    id: nanoid(6),
    type: type,
    fileId: '',
    ...props
  }
}