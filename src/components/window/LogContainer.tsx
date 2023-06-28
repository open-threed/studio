import { useState, useEffect } from 'react'
import { Console, Hook, Unhook } from 'console-feed'
import { GenericType } from '@/types'

export default function LogContainer() {
  const [logs, setLogs]: GenericType = useState([])

  useEffect((): () => void => {
    const hookedConsole = Hook(
      window.console,
      (log) => setLogs((currLogs: GenericType) => [...currLogs, log]),
      false
    )
    console.log('Welcome to log section')
    return () => Unhook(hookedConsole)
  }, [])

  return (
    <div className="log-container">
      <Console logs={logs} variant="dark" />
    </div>
  )
}
