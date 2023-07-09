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
      'Box Props': folder(
        mountObject([
          'width',
          'height',
          'depth',
          'widthSegments',
          'heightSegments',
        ])
      ),
    })
  ), [current])

  useEffect(() => {
    if(current.id) {
      updateControl(set, props.inject, {
        width: current.width,
        height: current.height,
        depth: current.depth,
        widthSegments: current.widthSegments,
        heightSegments: current.heightSegments,
      })
    }
  }, [current])

  return <div />
}