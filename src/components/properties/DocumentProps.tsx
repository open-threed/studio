import { useDocumentStore } from '../../store/document';
import { useControls, folder } from "leva";

export default function DocumentProps() {
  const { document, updateDocument, updateDocumentOrbitalControls,
    updateDocumentCanvas } = useDocumentStore()
    const doc: {
      [key: string]: any
    } = document

  const mountObject = (arrlv: string[]) => arrlv.reduce(
    (obj, item) => Object.assign(obj, {
      [item]: {
        value:  doc[item],
        onChange: (e: any) => updateDocument({ [item]: e })
      }
    }), {});

  const mountOrbitalControlsObject = (arrlv: string[]) => arrlv.reduce(
    (obj, item) => Object.assign(obj, {
      [item]: {
        value: doc.orbitalControls[item],
        onChange: (e: any) => updateDocumentOrbitalControls({ [item]: e })
      }
    }), {});

  const mountCanvasObject = (arrlv: string[]) => arrlv.reduce(
    (obj, item) => Object.assign(obj, {
      [item]: {
        value: doc.canvas[item],
        onChange: (e: any) => updateDocumentCanvas({ [item]: e })
      }
    }), {});
  
  useControls({
    Document: folder(mountObject([
      'title',
      'description',
      'helpers',
      'axes',
    ])),
    OrbitalControls: folder(mountOrbitalControlsObject([
      'enableDamping',
      'enablePan',
      'enableRotate',
      'enableZoom',
      'reverseOrbit',
      'makeDefault',
      'enabled',
      'minPolarAngle',
      'screenSpacePanning',
      'autoRotate',
      'regress',
    ])),
    Canvas: folder({
      ...mountCanvasObject([
        'shadows',
        'frameloop',
        'orthographic',
        'dpr',
        'legacy',
        'linear',
        'eventPrefix',
        'flat',
      ]),
      // gl: {},
      // scene: {},
      // raycaster: {},
      // Camera: folder({
      //   fov: document.canvas.camera.fov,
      //   near: document.canvas.camera.near,
      //   far: document.canvas.camera.far,
      //   position: document.canvas.camera.position,
      // }),
      // Resize: folder({
      //   scroll: document.canvas.resize.scroll,
      //   Debounce: folder({
      //     scroll: document.canvas.resize.debounce.scroll,
      //     resize: document.canvas.resize.debounce.resize
      //   })
      // }),
    }),
  })
  
  return <div />
}
