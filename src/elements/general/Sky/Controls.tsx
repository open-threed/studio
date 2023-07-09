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
      'Sky Props': folder(mountObject([
        'distance',
        // 'sunPosition',
        'inclination',
        'azimuth',
        'mieCoefficient',
        'mieDirectionalG',
        'rayleigh',
        'turbidity',
      ]))
    })
  ), [current])

  useEffect(() => {
    if(current.id) {
      updateControl(set, props.inject, {
        distance: current.distance,
        inclination: current.inclination,
        azimuth: current.azimuth,
        mieCoefficient: current.mieCoefficient,
        mieDirectionalG: current.mieDirectionalG,
        rayleigh: current.rayleigh,
        turbidity: current.turbidity,
      })
    }
  }, [current])

  return <div />
}