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
      'Cone Props': folder(mountObject([
        'radius',
        'height',
        'radialSegments',
        'heightSegments',
        'openEnded',
        'thetaStart',
        'thetaLength',
      ])),
    })
  ), [current])

  useEffect(() => {
    if(current.id) {
      updateControl(set, props.inject, {
        radius: current.radius,
        height: current.height,
        radialSegments: current.radialSegments,
        heightSegments: current.heightSegments,
        openEnded: current.openEnded,
        thetaStart: current.thetaStart,
        thetaLength: current.thetaLength,
      })
    }
  }, [current])

  return <div />
}