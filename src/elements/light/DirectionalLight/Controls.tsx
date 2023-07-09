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
      'Directional Light Props': folder(mountObject([
        'shadow',
        'target',
      ])),
    })
  ), [current])

  useEffect(() => {
    if(current.id) {
      updateControl(set, props.inject, {
        shadow: current.shadow,
        target: current.target,
      })
    }
  }, [current])

  return <div />
}