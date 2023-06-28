import { toast } from 'react-hot-toast/headless';

import usePlayer from './usePlayer';
import getFunctionByName from '../utils/getFunctionByName';

function runFunctionByName(code: string, functionName: string) {
  if(code.includes(`function ${functionName}(`)) {
    return functionName + '(sdk);'
  }
}

type NotificationContent = {
  title: string
  text: string
}

export default function useSdk() {
  const { isPlayerScreen } = usePlayer()

  function run(
    component = null,
    code = '',
    functionName = 'main'
  ) {
    if(!isPlayerScreen) {
      return null
    }

    const onStart = () => {
      toast('Welcome to ThreeD SDK.')
    }

    const onHelp = () => {
      const titleValue = 'Need a help?'
      const messageValue = 'Access docs.threed.world to more derails.'
      toast(`${titleValue}\n${messageValue}`)
    }

    const sdk = {
      util: () => null,
      start: onStart,
      help: onHelp,
      component,
      notifications: {
        show: ({title, text}: NotificationContent) => toast(`${title}\n${text}`)
      }
    }

    sdk.util()

    const codex = `
      ${getFunctionByName(code, functionName)}
      ${runFunctionByName(code, functionName)}
    `

    eval(codex)
  }

  return {
    run
  }
}
