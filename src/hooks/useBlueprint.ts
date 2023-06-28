import usePlayer from "./usePlayer";
import { useGraphStore } from "../store/graph";
import { EdgeProps, NodeProps } from "reactflow";
import { toast } from 'react-hot-toast';
import { InputValueType } from "@/types";

type AppFunctionOption = {
  label: string
  value: InputValueType
}

type AppFunctionNames = 'updateScene'
  | 'updateElement'
  | 'showAlert'
  | 'showConsoleLog'
  | 'showNotification'

type AppFunctionProps = {
  options: AppFunctionOption[]
  label: AppFunctionNames
}

type ItemMainProps = {
  data: AppFunctionProps
}

type AppFunctions = {
  updateScene: (props: AppFunctionProps) => void
  updateElement: (props: AppFunctionProps) => void
  showAlert: (props: AppFunctionProps) => void
  showConsoleLog: (props: AppFunctionProps) => void
  showNotification: (props: AppFunctionProps) => void
}

type ItemProps = {
  fromId: string
  from: string
  toId: string
  to: string
}

export default function useBlueprint() {
  const { isPlayerScreen } = usePlayer()
  const { graph } = useGraphStore()

  if (!graph || !isPlayerScreen) {
    return {
      run: () => null
    }
  }

  const functions:AppFunctions = {
    updateScene: (props) => {
      console.log("updateScene", props)
    },
    updateElement: (props) => {
      console.log("updateElement", props)
    },
    showAlert: (props) => {
      alert(props.options.find(({label})=>label==='title')?.value)
    },
    showConsoleLog: (props) => {
      console.log(props)
    },
    showNotification: (props) => {
      const titleValue = props.options.find(({label})=>label==='title')?.value
      const messageValue = props.options.find(({label})=>label==='message')?.value
      toast(`${titleValue}\n${messageValue}`)
    },
  }

  function quebrarArrayPorOn(array: ItemProps[]) {
    const result = [];
    let subArray = [];
  
    for (let i = 0; i < array.length; i++) {
      const obj = array[i];
  
      if (obj.from.toLowerCase().startsWith('on')) {
        if (subArray.length > 0) {
          result.push(subArray);
          subArray = [];
        }
      }
  
      subArray.push(obj);
    }
  
    if (subArray.length > 0) {
      result.push(subArray);
    }
  
    return result;
  }
  
  const run = (functionName:string, id: string) => {
    const edges = graph?.edges
    const nodes = graph?.nodes

    if(!edges?.length || !nodes?.length || !isPlayerScreen) {
      return null
    }

    const initialNodesIds = nodes.filter(({data}:NodeProps)=>data.label.toLowerCase().startsWith('on')).map(({id}:NodeProps)=>(id))
    const initialEdgesIds = edges.filter(({target}:EdgeProps) => initialNodesIds.includes(target)).map(({id}:EdgeProps)=>(id))

    const list:ItemProps[] = []

    function showEdge(id:string) {
      if(id) {
        const currentEdge = edges.find((edge:EdgeProps)=>edge.id===id)
        const currentNode = nodes.find((node:NodeProps)=>node.id===currentEdge.target)
        const nextNode = nodes.find((node:NodeProps)=>node.id===currentEdge.source)
        const nextEdge = edges.find((edge:EdgeProps)=>edge.target===nextNode?.id)
        if(currentNode && nextNode) {
          list.push({
            fromId: currentNode.id,
            from:currentNode.data.label,
            toId: nextNode.id,
            to:nextNode.data.label
          })
          showEdge(nextEdge?.id)
        }
      }
    }

    initialEdgesIds.map((id:string) => {
      showEdge(id)
    })

    const result = quebrarArrayPorOn(list)

    const tentativa = result.map((flow) => {
      return {
        ...nodes.find((node:NodeProps) => node.id===flow[0].fromId),
        childrens: flow.map(({toId}) => {
          return nodes.find((node:NodeProps) => node.id===toId)
        })
      }
    })

    tentativa
      .find((item)=>{
        return (item.data.options.find(({value}:AppFunctionOption)=>value===id) && item.data.label===functionName)
      })
      ?.childrens
      ?.map((item:ItemMainProps) => {
        functions[item.data.label](item.data)
      })
  }

  return {
    run
  }
}