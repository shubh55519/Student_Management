import React, { StrictMode } from 'react'
import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import Form from './Form';
import './App.css';
import Update from './Update';

function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/form' element={<Form />} />
        <Route path='/update' element={<Update />} />
      </Routes>

    </>
  )
}

export default App;