import { useControls, folder } from "leva";
import { useEffect } from 'react';

import useProviderControls from '@/hooks/useProviderControls';
import { useElementsStore } from '@/store/elements';
import props from './props';

export default function Controls() {
  const { mountObject, normalizeControls, updateControl } = useProviderControls()
  const { current } = useElementsStore()

  const [_, set] = useControls(() => (
    normalizeControls(props.inject, {
      'Text Props': folder(mountObject([
        'text',
        'anchorX',
        'anchorY',
      ]))
    })
  ), [current])

  useEffect(() => {
    if(current.id) {
      updateControl(set, props.inject, {
        text: current.text,
        anchorX: current.anchorX,
        anchorY: current.anchorY,
      })
    }
  }, [current])

  return <div />
}