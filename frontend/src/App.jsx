import { useState } from 'react'
import Dashboard from './dashboards/Dashboard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <section style={{fontSize:"16px"}}>
      <h1 style={{fontSize:"3em"}}>UserName </h1>
      <hr />
      <Dashboard />
    </section>
  )
}

export default App
