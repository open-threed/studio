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
      'TorusKnot Props': folder(mountObject([
        'radius',
        'tube',
        'radialSegments',
        'tubularSegments',
        'p',
        'q',
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
        p: current.p,
        q: current.q,
      })
    }
  }, [current])

  return <div />
}