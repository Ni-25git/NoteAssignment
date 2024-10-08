import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Note = () => {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/notes');
            if (response.status === 201) {
                setNotes(response.data.notes); 
            }
        } catch (error) {
            console.error(error);
            setError('Error in fetching notes');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (noteId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/notes/${noteId}`);
            if (response.status === 200) { 
                setNotes(notes.filter((note) => note._id !== noteId));
            }
        } catch (error) {
            console.error(error);
            setError('Error in deleting note');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdate = (noteId) => {
        navigate(`/updatenote/${noteId}`);
    };

    if (loading) return <div className='text-center text-black-500 font-bold text-2xl '>Loading...</div>;
    if (error) return <div className='text-center text-red-700 font-bold text-2xl'>{error}</div>;

    return (
        <div>
            {notes.length > 0 ? (
                <div>
                    <h1 className='text-black-700 font-bold text-2xl p-3 text-center'>All Notes</h1>
                    <div className='p-5'>
                        {notes.map((note) => (
                            <div key={note._id} className='border p-4 rounded mb-4 bg-gray-100'>
                                <h1 className='font-bold text-lg'>Title: {note.title}</h1>
                                <p className='text-gray-600'>{note.content}</p>
                                <button className='bg-red-500 text-white border rounded p-2 mt-1' onClick={() => handleDelete(note._id)}>Delete</button>
                                <button className='bg-blue-500 text-white border rounded p-2 mt-1' onClick={() => handleUpdate(note._id)}>Update</button> {/* Fixed the call here */}
                            </div>
                        ))} 
                    </div>
                </div>
            ) : (
                <h1 className='text-center text-red-700 font-bold text-2xl'>No Notes Available</h1>
            )}
        </div>
    );
};

export default Note;
