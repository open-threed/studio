import { useEffect } from 'react';
import { useControls, folder, button } from "leva";

import useProviderControls from '@/hooks/useProviderControls';
import { useSettingsStore } from '@/store/settings';
import { useElementsStore } from '@/store/elements';
import props from './props';

export default function Controls() {
  const { mountObject, normalizeControls, updateControl } = useProviderControls()
  const { setPicker } = useSettingsStore()
  const { current } = useElementsStore()

  const [_, set] = useControls(() => (
    normalizeControls(props.inject, {
      'Image File': folder({
        file: {
          editable: false,
          value: `(${current.file})`
        },
        'Select File': button(() => setPicker('image')),
      }),
      'Image Props': folder(
        mountObject([
          'color',
          'zoom',
          'grayscale',
          'toneMapped',
          'transparent',
          'opacity',
        ])
      )
    })
  ), [current])

  useEffect(() => {
    if(current.id) {
      updateControl(set, props.inject, {
        file: current.file,
        color: current.color,
        zoom: current.zoom,
        grayscale: current.grayscale,
        toneMapped: current.toneMapped,
        transparent: current.transparent,
        opacity: current.opacity,
      })
    }
  }, [current])

  return <div />
}