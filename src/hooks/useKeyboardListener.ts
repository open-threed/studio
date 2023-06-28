import { useHotkeys } from '@mantine/hooks'
import { nanoid } from 'nanoid'
import { toast } from 'react-hot-toast';

import { useElementsStore } from '../store/elements'
import useModal from './useModal'

export default function useKeyboardListener() {
  const { current, createElement, removeElement } = useElementsStore()
  const { openSearchModal } = useModal()

  function saveDocument(event: KeyboardEvent) {
    event.preventDefault();
    const titleValue = "All saved" + current?.id
    const messageValue = `It's not required, autosave is already active!`
    toast(`${titleValue}\n${messageValue}`)
  }

  function cloneElement(event: KeyboardEvent) {
    event.preventDefault();
    createElement({
      ...current,
      id: nanoid(6),
      object: null,
      eventObject: null,
      fileId: ''
    })
  }

  function mountAndRemoveElement(event: KeyboardEvent) {
    event.preventDefault();
    if(current) {
      removeElement(current.id);
    }
  }

  useHotkeys([
    ['mod+K', openSearchModal],
    ['mod+S', saveDocument],
    ['mod+D', cloneElement],
    ['Backspace', mountAndRemoveElement],
  ]);

  return null
}
