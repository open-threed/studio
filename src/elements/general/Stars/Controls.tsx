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
      'Stars Props': folder(mountObject([
        'radius',
        'depth',
        'count',
        'factor',
        'saturation',
        'fade',
        'speed',
      ]))
    })
  ), [current])

  useEffect(() => {
    if(current.id) {
      updateControl(set, props.inject, {
        radius: current.radius,
        depth: current.depth,
        count: current.count,
        factor: current.factor,
        saturation: current.saturation,
        fade: current.fade,
        speed: current.speed,
      })
    }
  }, [current])

  return <div />
}