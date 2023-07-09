import { useEffect } from 'react';
import { useControls, folder } from "leva";

import { useElementsStore } from '@/store/elements';
import useProviderControls from '@/hooks/useProviderControls';
import CONSTANTS from '@/constants';
import props from './props';

export default function Controls() {
  const { current, updateElement } = useElementsStore()
  const { mountObject, normalizeControls, updateControl } = useProviderControls()

  const [_, set] = useControls(() => (
    normalizeControls(props.inject, {
      'Environment Props': folder({
        preset: {
          options: CONSTANTS.environment,
          value: current.environment,
          onChange: (e) => updateElement({
            id: current.id,
            environment: e
          })
        },
        ...mountObject([
          'blur',
        ])
      }),
    })
  ), [current])

  useEffect(() => {
    if(current.id) {
      updateControl(set, props.inject, {
        preset: current.environment,
        blur: current.blur
      })
    }
  }, [current])

  return <div />
}