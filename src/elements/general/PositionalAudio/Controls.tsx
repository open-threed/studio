import { useEffect } from 'react';
import { useControls, folder } from "leva";

import useProviderControls from '@/hooks/useProviderControls';
import { useElementsStore } from '@/store/elements';
import props from './props';

export default function Controls() {
  const { mountObject, normalizeControls, updateControl } = useProviderControls()
  const { current } = useElementsStore()

  const [_, set] = useControls(() => (
    normalizeControls(props.inject, {
      'Position Audio Props': folder(
        mountObject([
          'soundUrl',
          'distance',
          'autoplay',
          'loop',
        ])
      )
    })
  ), [current])

  useEffect(() => {
    if(current.id) {
      updateControl(set, props.inject, {
        soundUrl: current.soundUrl,
        distance: current.distance,
        autoplay: current.autoplay,
        loop: current.loop,
      })
    }
  }, [current])

  return <div />
}