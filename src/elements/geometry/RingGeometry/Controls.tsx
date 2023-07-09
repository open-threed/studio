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
      'Ring Props': folder(mountObject([
        'innerRadius',
        'outerRadius',
        'thetaSegments',
        'phiSegments',
        'thetaStart',
        'thetaLength',
      ])),
    })
  ), [current])

  useEffect(() => {
    if(current.id) {
      updateControl(set, props.inject, {
        innerRadius: current.innerRadius,
        outerRadius: current.outerRadius,
        thetaSegments: current.thetaSegments,
        phiSegments: current.phiSegments,
        thetaStart: current.thetaStart,
        thetaLength: current.thetaLength,
      })
    }
  }, [current])

  return <div />
}