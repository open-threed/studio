import PropertiesForm from '../form/PropertiesForm';
import { useDocumentStore } from '../../store/document';
import { useElementsStore } from '../../store/elements';
import { ElementType } from '@/types';

export default function Properties() {
  const { document, updateDocument } = useDocumentStore()
  const { current, updateElement } = useElementsStore()

  const handleElementChange = (value: ElementType) => {
    updateElement({
      id: current.id,
      ...value
    })
  }

  const handleDocumentChange = (value: ElementType) => {
    updateDocument({
      ...value
    })
  }

  if(!current) {
    return (
      <PropertiesForm
        onChange={handleDocumentChange}
        initialObject={document}
      />
    )
  }

  const {
    eventObject,
    object,
    id,
    type,
    editable,
    ...restOfCurrent
  } = current
 
  return (
    <PropertiesForm
      onChange={handleElementChange}
      initialObject={restOfCurrent}
      hideOptions={[
        'material.',
      ]}
      selects={{
        environment: [
          'apartment',
          'bridge',
          'city',
          'dawn',
          'esplanade',
          'forest',
          'hall',
          'lab',
          'lobby',
          'night',
          'park',
          'sky',
          'studio',
          'sunrise',
          'sunset',
          'venice',
          'warehouse',
          'workshop'
        ]
      }}
    />
  )
}