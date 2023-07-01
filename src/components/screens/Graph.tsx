import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Position,
  Handle,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  NodeProps,
  addEdge,
  Connection,
  useReactFlow,
  useOnViewportChange,
  Viewport,
  NodeChange,
  EdgeChange,
  EdgeProps,
} from 'reactflow';
import { nanoid } from 'nanoid'

import 'reactflow/dist/style.css';
import Actions from '../general/Actions';
import CONSTANTS, { BlueprintFunction, BlueprintFunctionName } from '../../constants';
import mountToolbarActions from '../../utils/mountToolbarActions';
import { useGraphStore } from '../../store/graph';
import { useElementsStore } from '../../store/elements';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const getNewNode = (name: BlueprintFunctionName) => {
  const hash = nanoid(6)
  return {
    id: hash,
    position: { x: 600, y: 200 },
    data: {
      label: name,
      options: CONSTANTS.blueprint[name].map((item) => ({...item, id: hash+item.id}))
    },
    type: 'square',
    dragHandle: '.custom-drag-handle-'+hash,
  }
}

export function GraphToolbar() {
  const reactFlowInstance = useReactFlow();
  const { graph, graphLock, updateGraph, setGraphLock } = useGraphStore()

  function createNode(name: BlueprintFunctionName) {
    const newNode = getNewNode(name)
    const mergedNodes = graph?.nodes?.length ? [...graph?.nodes || {},newNode] : [newNode]

    updateGraph({
      nodes: mergedNodes
    })
  }

  const toolbarGraph = mountToolbarActions(CONSTANTS.toolbar.graph, {
    create_node: { onClick: null },
    on_mount: { onClick: () => createNode('onMount') },
    on_click: { onClick: () => createNode('onClick') },
    on_pointer_over: { onClick: () => createNode('onPointerOver') },
    show_notification: { onClick: () => createNode('showNotification') },
    show_console_log: { onClick: () => createNode('showConsoleLog') },
    show_alert: { onClick: () => createNode('showAlert') },
    update_element: { onClick: () => createNode('updateElement') },
    update_scene: { onClick: () => createNode('updateScene') },
    zoom_in: { onClick: reactFlowInstance.zoomIn },
    zoom_out: { onClick: reactFlowInstance.zoomOut },
    fitview: { onClick: reactFlowInstance.fitView },
    toggle_lock: {
      onClick: () => setGraphLock(!graphLock),
      icon: graphLock ? 'IconLock' : 'IconLockOpen'
    },
  })
  
  return (
    <div>
      <Actions vertical data={toolbarGraph}/>
    </div>
  )
}

const dataz = [
  { value: 'props', label: 'props' },
];

function Square(props: NodeProps) {
  const { graph, graphLock, updateGraph } = useGraphStore()
  const { elements } = useElementsStore()

  function updateNodeField(field: string, value: string | null) {
    updateGraph({
      nodes: graph.nodes.map((itm: NodeProps) => {
        if(itm.id===props.id) {
          return {
            ...itm,
            data: {
              ...itm.data,
              options: itm.data.options.map((opt: BlueprintFunction) => ({
                ...opt,
                value: opt.label===field ? value : opt.value
              })),
            }
          }
        }
        return itm
      })
    })
  }

  return (
    <div className={`bg-black border ${props.selected ? 'border-gray-500 shadow-md' : ''} text-white rounded-sm cursor-default transition-all `}>
      <div className={`py-1 px-2 text-gray-400 border-b ${props.selected ? 'border-gray-500 shadow-md' : ''} ${graphLock ? 'cursor-default' : 'cursor-move ' + props.dragHandle?.replace(/^./, "")}`}>
        <div className="flex justify-between items-center">
          <p className="text-sm">
            {props.data.label}
          </p>
        </div>
      </div>
      {props.data.options.map((item: BlueprintFunction, index: number) => {
        if(item.input) {
          return (
            <Handle
              key={item.id}
              id={item.id}
              type="source"
              position={Position.Left}
              className={`left-[-4px] w-2 h-4 rounded-[2px] bg-gray-500 border-none cursor-cell ${graphLock ? 'pointer-events-none' : ''}`}
              style={{ top: 44+(40*(index+1)) }}
            />
          )
        } else if(item.output) {
          return (
            <Handle
              key={item.id}
              id={item.id}
              type="target"
              position={Position.Right}
              className={`right-[-4px] w-2 h-4 rounded-[2px] bg-gray-500 border-none cursor-cell ${graphLock ? 'pointer-events-none' : ''}`}
              style={{ top: 44+(40*(index+1)) }}
            />
          )
        } else {
          return null
        }
      })}
      <div className="p-5 pb-2">
        {props.data.options.map((item: BlueprintFunction) => {
          if(item.input) {
            return (
              <div className="flex space-x-4 mb-3 items-center" key={item.id}>
                <p className="text-sm w-full h-[20px] overflow-hidden text-right">
                 {item.label} 
                </p>
                <div className="w-[257px]">
                  <Badge color="gray" variant="outline" >with props</Badge>
                </div>
              </div>
            )
          } else if(item.output) {
            return (
              <div className="flex space-x-4 mb-3 items-center" key={item.id}>
                <p className="text-sm w-full h-[20px] overflow-hidden text-right">
                 {item.label} 
                </p>
                <div className="w-[257px]">
                <Select
                  disabled={graphLock}
                  onValueChange={(e) => console.log(e)}
                  // value={String(item.value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {dataz.map(({value, label}, index:number) => (
                        <SelectItem key={index} value={value}>{label}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                </div>
              </div>
            )
          } else {
            return (
              <div className="flex space-x-4 mb-3 items-center" key={item.id}>
                <p className="text-sm w-full h-[20px] overflow-hidden text-right">
                 {item.label} 
                </p>
                {item.label === 'element' ? (
                  <div className="w-[257px]">
                  <Select
                    disabled={graphLock}
                    onValueChange={(e) => updateNodeField('element', e)}
                    value={String(item.value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {elements.map(({id, type})=>({value:id, label: type+' ('+id+')'})).map(({value, label}, index:number) => (
                          <SelectItem key={index} value={value}>{label}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  </div>
                ): (
                  <div className="w-[257px]">
                    <Input
                      value={item.value || ''}
                      disabled={graphLock}
                      onChange={(e) => updateNodeField(item.label, e.target.value)}
                    />
                  </div>
                )}
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

const NODE_TYPES = {
  square: Square
}

export default function Graph() {
  const reactFlowInstance = useReactFlow();
  const { graph, graphLock, updateGraph } = useGraphStore()

  const onNodesChange = (changes: NodeChange[]) => updateGraph({
    nodes: applyNodeChanges(changes, graph?.nodes || [])
  });

  const onEdgesChange = (changes: EdgeChange[]) => updateGraph({
    edges: applyEdgeChanges(changes, graph?.edges || [])
  });

  const onConnect = (connection: Connection) => updateGraph({
    edges: addEdge(connection, graph?.edges || [])
  })

  useOnViewportChange({
    onEnd: useCallback((viewport: Viewport) => {
      updateGraph({
        viewport
      })
    }, [updateGraph]),
  });

  const setFitView = useCallback(() => {
    if (graph?.viewport) {
      reactFlowInstance.setViewport(graph?.viewport)
    } else {
      reactFlowInstance.fitView()
    }
  }, [reactFlowInstance, graph])

  useEffect(() => {
    setFitView()
  }, [setFitView])

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={graph?.nodes}
        edges={graph?.edges?.map((item: EdgeProps) => ({
          ...item,
          animated: true,
          deletable: !graphLock,
        }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background
          gap={20}
          size={1}
          color='#2b3950'
        />
      </ReactFlow>
    </div>
  );
}