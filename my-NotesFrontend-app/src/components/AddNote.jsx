import React, { useState } from 'react';
import axios from 'axios';

const AddNote = () => {
    const [notes , setNotes] = useState({title:'' , content:''});
    const [error , setError] = useState(null)

    const handleChange=(e)=>{
        const {name , value} = e.target
        setNotes({...notes , [name]:value});
        
    }

    const handleSubmit= async (e)=>{
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/notes' , notes)

            if(response.status===201){
                setNotes({title:'' , content:''});
                console.log(response.data)

            }
        } catch (error) {
            console.log(error);
            setError('Error in adding note')

        }

        if (error) return <div className='text-center text-red-700 font-bold text-2xl'>{error}</div>;
    
        
        

    }
    
  return (
    <>
      <h1 className='text-black-700 text-center font-bold text-3xl p-2 mt-2'>Add Notes here..</h1>
      <div className='flex flex-col max-w-[500px] max-h-[500px] m-auto p-4'>
      <label className='text-black-500 font-bold text-lg'>Title</label>
      <input className='border-2 h-10 rounded-md' type="text" value={notes.title} name='title' onChange={(e)=>handleChange(e)} />
      <label className='text-black-500 font-bold text-lg'>Content</label>
      <input className='border-2 h-10 rounded-md' type="text" value={notes.content} name='content' onChange={(e)=>handleChange(e)} />
      <button className='bg-red-700 rounded border-white m-auto p-2 mt-2 text-white' onClick={handleSubmit}>Add Note</button>

      </div>
    </>
  )
}

export default AddNote
