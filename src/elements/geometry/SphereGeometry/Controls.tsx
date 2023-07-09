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
      'Sphere Props': folder(mountObject([
        'radius',
        'widthSegments',
        'heightSegments',
        'phiStart',
        'phiLength',
        'thetaStart',
        'thetaLength',
      ])),
    })
  ), [current])

  useEffect(() => {
    if(current.id) {
      updateControl(set, props.inject, {
        radius: current.radius,
        widthSegments: current.widthSegments,
        heightSegments: current.heightSegments,
        phiStart: current.phiStart,
        phiLength: current.phiLength,
        thetaStart: current.thetaStart,
        thetaLength: current.thetaLength,
      })
    }
  }, [current])

  return <div />
}