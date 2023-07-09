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
      'Torus Props': folder(mountObject([
        'radius',
        'tube',
        'radialSegments',
        'tubularSegments',
        'arc',
      ])),
    })
  ), [current])

  useEffect(() => {
    if(current.id) {
      updateControl(set, props.inject, {
        radius: current.radius,
        tube: current.tube,
        radialSegments: current.radialSegments,
        tubularSegments: current.tubularSegments,
        arc: current.arc,
      })
    }
  }, [current])

  return <div />
}