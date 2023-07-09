// import PropertiesForm from '@/components/form/PropertiesForm';
// import { useDocumentStore } from '@/store/document';
// import React from 'react';
import { useElementsStore } from '@/store/elements';
// import { ElementType } from '@/types';
// import { Leva, useControls } from "leva";
import DocumentProps from '@/components/properties/DocumentProps';
import { elementControls } from '@/elements';
import Resources from '../resources/Resources';
import { useSettingsStore } from '@/store/settings';
import { useEffect } from 'react';
import { Leva } from 'leva';

function CurrentProperties() {
  const { current } = useElementsStore()
  const CurrentPropsComponent = elementControls[current.type]
  return <CurrentPropsComponent />
}

export default function Properties() {
  // const { document } = useDocumentStore()
  const { current } = useElementsStore()
  const {settings, setPicker} = useSettingsStore()

  useEffect(() => {
    if(!current) {
      setPicker('')
    }
  }, [current])

  if(!current) {
    return (
      <>
        <DocumentProps />
        <div id="leva">
          <Leva titleBar={false} />
        </div>
      </>
    )
    // return (
    //   <PropertiesForm
    //     onChange={handleDocumentChange}
    //     initialObject={document}
    //   />
    // )
  }

  if(settings.picker !== '') {
    return (
      <Resources />
    )
  }

  return (
    <>
      <CurrentProperties/>
      <div id="leva">
        <Leva titleBar={false} />
      </div>
    </>
  )

  // const {
  //   eventObject,
  //   object,
  //   id,
  //   type,
  //   editable,
  //   ...restOfCurrent
  // } = current
 
  // return (
  //   <PropertiesForm
  //     onChange={handleElementChange}
  //     initialObject={restOfCurrent}
  //     hideOptions={[
  //       'material.',
  //     ]}
  //     selects={{
  //       environment: [
  //         'apartment',
  //         'bridge',
  //         'city',
  //         'dawn',
  //         'esplanade',
  //         'forest',
  //         'hall',
  //         'lab',
  //         'lobby',
  //         'night',
  //         'park',
  //         'sky',
  //         'studio',
  //         'sunrise',
  //         'sunset',
  //         'venice',
  //         'warehouse',
  //         'workshop'
  //       ]
  //     }}
  //   />
  // )
}