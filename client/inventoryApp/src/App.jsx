import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddFrom from './components/AddFrom';

function App() {
  const [inventory, setInventory] = useState([])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' 
          element={<HomePage inventory={inventory} setInventory={setInventory}/>} 
        />
        <Route path ='/add' element={<AddFrom/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
