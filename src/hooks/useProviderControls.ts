import { useElementsStore } from '@/store/elements';
import { useSettingsStore } from '@/store/settings';
import { ElementType } from '@/types';
import { button, folder } from "leva";

export default function useProviderControls() {
  const { current, updateElement } = useElementsStore()
  const {setPicker} = useSettingsStore()

  const handleElementChange = (label: string, value: ElementType) => {
    updateElement({
      id: current.id,
      [label]: value
    })
  }

  const mountObject = (arrlv: string[]) => arrlv.reduce(
    (obj, item) => Object.assign(obj, {
      [item]: {
        value: current[item],
        onChange: (e: any) => handleElementChange(item, e)
      }
    }), {});

  const elementProps = {
    Element: folder(
      mountObject([
        'name',
        'editable',
        'visible',
      ])
    ),
    Code: folder({
      fileId: {
        editable: false,
        value: `(${current.fileId})`
      },
      'Select Code File': button(() => setPicker('code')),
    }),
  }

  const objectProps = {
    Position: folder(
      mountObject([
        'rotation',
        'position',
        'scale',
      ])
    ),
    Shadow: folder(
      mountObject([
        'castShadow',
        'receiveShadow',
      ])
    ),
    Advanced: folder(
      mountObject([
        'frustumCulled',
        'renderOrder',
        'up',
      ])
    )
  }

  const materialProps = {
    'Material': folder({
      material_type: {
        editable: false,
        value: `(${current.material_type})`
      },
      'Select Material': button(() => setPicker('material')),
    }),
    'Texture': folder({
      texture: {
        editable: false,
        value: `(${current.texture})`
      },
      'Select Texture': button(() => setPicker('texture')),
    }),
    'Material Options': folder(
      current.material
    ),
  }

  const lightProps = {
    Light: folder(
      mountObject([
        'color',
        'intensity',
        'isLight',
      ])
    ),
  }

  function normalizeControls(inject: string[], children: any) {

    const hasObject = inject.find((item) => item === 'OBJECT')
    const hasMaterial = inject.find((item) => item === 'MATERIAL')
    const hasLight = inject.find((item) => item === 'LIGHT')

    const obj = {
      Element: elementProps.Element,
      ...children,
      Position: !hasObject ? null : objectProps.Position,
      'Material': !hasMaterial ? null : materialProps['Material'],
      'Material Options': !hasMaterial ? null : materialProps['Material Options'],
      'Texture': !hasMaterial ? null : materialProps['Texture'],
      Light: !hasLight ? null : lightProps.Light,
      Shadow: !hasObject ? null : objectProps.Shadow,
      Code: elementProps.Code,
      Advanced: !hasObject ? null : objectProps.Advanced,
    }

    Object.keys(obj).forEach(key => {
      if (obj[key] === null) {
        delete obj[key];
      }
    })

    // console.log(obj)

    return obj;
  }

  function updateControl(set: (obj: any) => void, inject: string[], children: any) {

    const obj = !inject.includes('OBJECT') ? {} : {
      rotation: current.rotation,
      position: current.position,
      scale: current.scale,
      castShadow: current.castShadow,
      receiveShadow: current.receiveShadow,
      frustumCulled: current.frustumCulled,
      renderOrder: current.renderOrder,
      up: current.up,
    }
    const material = !inject.includes('MATERIAL') ? {} : {
      material_type: current.material_type,
      texture: current.texture,
    }
    const light = !inject.includes('LIGHT') ? {} : {

    }

    set({
      editable: current.editable,
      visible: current.visible,
      name: current.name,
      fileId: current.fileId,
      ...obj,
      ...material,
      ...light,
      ...children,
    })
  }


  return {
    updateControl,
    handleElementChange,
    mountObject,
    normalizeControls,
  }
}
