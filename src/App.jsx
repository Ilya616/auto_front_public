import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider } from 'react-router'
import {routes} from './routes'



function App() {
  console.log(routes)
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={routes} />

      123
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    
    </>
  )
}

export default App
