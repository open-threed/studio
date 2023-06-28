import Actions from '../general/Actions';
import { useState } from 'react'
import { nanoid } from 'nanoid';
import useModal from '../../hooks/useModal';
import useToolbar from '../../hooks/useToolbar';
import ProjectFiles from '../window/ProjectFiles';
import { GraphToolbar } from '../screens/Graph';
import mountToolbarActions from '../../utils/mountToolbarActions';
import CONSTANTS from '../../constants';
import { useSettingsStore } from '../../store/settings';
import { useElementsStore } from '../../store/elements';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import Icon from '../general/Icon'
import { GenericType } from '@/types';

export default function ToolbarLeft() {
  const [openedProjectFiles] = useState(true)
  const { openHubModal } = useModal()
  const { settings, setToolMove } = useSettingsStore()
  const { current, setCurrent, createElement } = useElementsStore()

  const { showVerticalLeft, toggleOpenLeft, isLeftOpen } = useToolbar()

  function mountAndCreateElement(type:string) {
    createElement({
      ...CONSTANTS.elements[type],
      id: nanoid(6),
      type,
      fileId: ''
    })
  }

  const toolbarVerticalLeft = mountToolbarActions(CONSTANTS.toolbar.left.map((item: GenericType) => ({...item, options: item?.options?.filter((subitem: GenericType) => !subitem?.disable)})), {
    select: {
      onClick: () => setCurrent(null),
      active: !current
    },
    move: {
      onClick: () => setToolMove('translate'),
      active: current && settings.tool.move === 'translate'
    },
    rotate: {
      onClick: () => setToolMove('rotate'),
      active: current && settings.tool.move === 'rotate'
    },
    scale: {
      onClick: () => setToolMove('scale'),
      active: current && settings.tool.move === 'scale'
    },
    geometry: { onClick: null },
    plane: { onClick: () => mountAndCreateElement('Plane') },
    sphere: { onClick: () => mountAndCreateElement('Sphere') },
    box: { onClick: () => mountAndCreateElement('Box') },
    capsule: { onClick: () => mountAndCreateElement('Capsule') },
    circle: { onClick: () => mountAndCreateElement('Circle') },
    cone: { onClick: () => mountAndCreateElement('Cone') },
    cylinder: { onClick: () => mountAndCreateElement('Cylinder') },
    dodecahedron: { onClick: () => mountAndCreateElement('Dodecahedron') },
    extrude: { onClick: () => mountAndCreateElement('Extrude') },
    icosahedron: { onClick: () => mountAndCreateElement('Icosahedron') },
    lathe: { onClick: () => mountAndCreateElement('Lathe') },
    octahedron: { onClick: () => mountAndCreateElement('Octahedron') },
    ring: { onClick: () => mountAndCreateElement('Ring') },
    tetrahedron: { onClick: () => mountAndCreateElement('Tetrahedron') },
    torus: { onClick: () => mountAndCreateElement('Torus') },
    torusKnot: { onClick: () => mountAndCreateElement('TorusKnot') },
    tube: { onClick: () => mountAndCreateElement('Tube') },
    media: { onClick: null },
    positional_audio: { onClick: () => mountAndCreateElement('PositionalAudio') },
    image: { onClick: () => mountAndCreateElement('Image') },
    svg: { onClick: () => mountAndCreateElement('Svg') },
    browser: { onClick: () => mountAndCreateElement('Browser') },
    typhography: { onClick: null },
    text: { onClick: () => mountAndCreateElement('Text') },
    text_3d: { onClick: () => mountAndCreateElement('Text3D') },
    helpers: { onClick: null },
    environments: { onClick: null },
    environment: { onClick: () => mountAndCreateElement('Environment') },
    stars: { onClick: () => mountAndCreateElement('Stars') },
    sky: { onClick: () => mountAndCreateElement('Sky') },
    lights: { onClick: null },
    ambient_light: { onClick: () => mountAndCreateElement('AmbientLight') },
    point_light: { onClick: () => mountAndCreateElement('PointLight') },
    directional_light: { onClick: () => mountAndCreateElement('DirectionalLight') },
    hemisphere_light: { onClick: () => mountAndCreateElement('HemisphereLight') },
    spot_light: { onClick: () => mountAndCreateElement('SpotLight') },
    hub: { onClick: openHubModal },
  })

  const toolbarCodeVerticalLeft = mountToolbarActions(CONSTANTS.toolbar.code, {
    code: {
      onClick: () => toggleOpenLeft(),
    },
  })

  const [opened, setOpen] = useState('1')
  function renderFileView() {
    return (
      <>
          {!isLeftOpen ? (
            <Actions vertical data={toolbarCodeVerticalLeft}/>
          ) : (
            <div className="mt-[-6px]">
              <Accordion type="single" value={opened} collapsible>
                <AccordionItem value="1" className="border-0">
                  <AccordionTrigger
                    className="bg-muted h-7 px-2"
                    onClick={() => {
                      if('1'===opened) {
                        toggleOpenLeft()
                      } else {
                        setOpen('1')  
                      }
                    }}
                  >
                    <div className="flex flex-row">
                      <Icon name="IconBox" label="Project files"/>
                      <span className="ml-2">Project files</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className={`toolbarRightBox`}>
                      {openedProjectFiles && <ProjectFiles />}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
      </>
    )
  }

  function renderActions() {
    return (
      <Actions vertical data={toolbarVerticalLeft}/>
    )
  }

  function renderGraph() {
    return (
      <GraphToolbar />
    )
  }

  function render() {
    switch (settings.main) {
      case 'view':
        return renderActions()
      case 'graph':
        return renderGraph()
      case 'code':
        return renderFileView()
      default:
        return <div />
    }
  }

  if(!showVerticalLeft) {
    return <div />
  }

  return (
    <div className={`toolbarContainer vertical bg-background`}>
      {render()}
    </div>
  );
}
