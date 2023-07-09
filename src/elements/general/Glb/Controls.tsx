import { useEffect } from 'react';
import { useControls, folder } from "leva";

import useProviderControls from '@/hooks/useProviderControls';
import { useElementsStore } from '@/store/elements';
import props from './props';

export default function Controls() {
  const { normalizeControls, updateControl } = useProviderControls()
  const { current } = useElementsStore()

  const [_, set] = useControls(() => (
    normalizeControls(props.inject, {
      'Glb Props': folder({
        id: current.id
      })
    })
  ), [current])

  useEffect(() => {
    if(current.id) {
      updateControl(set, props.inject, {
        id: current.id
      })
    }
  }, [current])

  return <div />
}
