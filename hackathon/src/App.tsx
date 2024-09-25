// import { useState } from 'react'

import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar: Takes a small portion of the screen */}
      <div className="h-12">
        <Navbar />
      </div>
      {/* Outlet: Takes the remaining screen space */}
      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
  
}

export default App
