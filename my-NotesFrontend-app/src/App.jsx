import { useState } from 'react'
import Navbar from './components/Navbar'
import AllRoutes from './components/AllRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
   
    <div>
      <Navbar />
      <AllRoutes />
    </div>
  )
}

export default App
