import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Note from './Note'
import AddNote from './AddNote'
import UpdateNote from './UpdateNote'

const AllRoutes = () => {
  return (
    <>
    <Routes>
        <Route path='/note' element={<Note />} />
        <Route path='/addnote' element={<AddNote />} />
        <Route path='/updatenote/:noteId' element={<UpdateNote />} />
    </Routes>
      
    </>
  )
}

export default AllRoutes
