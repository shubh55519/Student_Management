import React from 'react'
// import StudentTable from './StudentTable';
import Home from './Home';
// import Pagination from './Filter&Pagination';
import { Route, Routes } from 'react-router-dom';
import Form from './Form';
import './App.css';
import Update from './Update';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/form' element={<Form />} />
        <Route path='/update' element={<Update />} />
        {/* <Route path='/studenttable' element={} /> */}

        {/* <Pagination/> */}
      </Routes>
    </div>
  )
}

export default App;