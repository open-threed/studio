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
      'Text 3D Props': folder(mountObject([
        'text',
        'curveSegments',
        'bevelEnabled',
        'bevelSize',
        'bevelThickness',
        'height',
        'lineHeight',
        'letterSpacing',
        'size',
        'font',
      ]))
    })
  ), [current])

  useEffect(() => {
    if(current.id) {
      updateControl(set, props.inject, {
        text: current.text,
        curveSegments: current.curveSegments,
        bevelEnabled: current.bevelEnabled,
        bevelSize: current.bevelSize,
        bevelThickness: current.bevelThickness,
        height: current.height,
        lineHeight: current.lineHeight,
        letterSpacing: current.letterSpacing,
        size: current.size,
        font: current.font,
      })
    }
  }, [current])

  return <div />
}