import { useState } from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddFrom from './components/AddFrom';
import UpdateForm from './components/UpdateForm';


function App() {
  const [updateData, setUpdateData] = useState({})

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path ='/add' element={<AddFrom />}/>
        <Route path='/update/:id' element={<UpdateForm/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
