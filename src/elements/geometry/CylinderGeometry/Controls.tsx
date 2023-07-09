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
      'Cylinder Props': folder(mountObject([
        'radiusTop',
        'radiusBottom',
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
        radiusTop: current.radiusTop,
        radiusBottom: current.radiusBottom,
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