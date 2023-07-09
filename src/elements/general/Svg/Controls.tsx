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
      'Sgv Props': folder(mountObject([
        'src',
        'skipFill',
        'skipStrokes',
      ]))
    })
  ), [current])

  useEffect(() => {
    if(current.id) {
      updateControl(set, props.inject, {
        src: current.src,
        skipFill: current.skipFill,
        skipStrokes: current.skipStrokes,
      })
    }
  }, [current])

  return <div />
}