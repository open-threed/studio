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
      'Spot Light Props': folder(mountObject([
        'angle',
        'decay',
        'distance',
        'penumbra',
        'power',
        'shadow',
        'target',
        'map',
      ])),
    })
  ), [current])

  useEffect(() => {
    if(current.id) {
      updateControl(set, props.inject, {
        angle: current.angle,
        decay: current.decay,
        distance: current.distance,
        penumbra: current.penumbra,
        power: current.power,
        shadow: current.shadow,
        target: current.target,
        map: current.map,
      })
    }
  }, [current])

  return <div />
}