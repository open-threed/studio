import { useEffect } from 'react';
import { useControls, folder } from "leva";

import useProviderControls from '@/hooks/useProviderControls';
import { useElementsStore } from '@/store/elements';
import props from './props';

export default function Controls() {
  const { mountObject, normalizeControls, updateControl} = useProviderControls()
  const { current } = useElementsStore()

  const [_, set] = useControls(() => (
    normalizeControls(props.inject, {
      'Browser Props': folder(mountObject([
        'transform',
        'url',
        'width',
        'height',
      ]))
    })
  ), [current])

  useEffect(() => {
    if(current.id) {
      updateControl(set, props.inject, {
        transform: current.transform,
        url: current.url,
        width: current.width,
        height: current.height,
      })
    }
  }, [current])

  return <div />
}