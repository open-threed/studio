import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/App.tsx'
import '@/styles/globals.css'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className="dark w-full h-full absolute top-0 left-0 bg-black">
      <App />
    </div>
  </React.StrictMode>,
)
