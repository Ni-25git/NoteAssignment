import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateNote = () => {
    const { noteId } = useParams();
    const [note, setNote] = useState({ title: '', content: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/notes/${noteId}`);
                if(response.status===201){
                    setNote(response.data);
                    console.log(response.data);

                }
            } catch (error) {
                console.error(error);
                setError('Error fetching note');
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [noteId]);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/notes/${noteId}`, note);
            if (response.status === 201) {
                navigate('/note');
                console.log('Note updated');
            }
        } catch (error) {
            console.error(error);
            setError('Error updating note');
        }
    };

    return (
        <>
            <h1 className='text-black-700 text-center font-bold text-3xl p-2 mt-2'>Edit Notes here..</h1>
            {loading && <div className='text-center text-black-500'>Loading...</div>}
            {error && <div className='text-center text-red-700'>{error}</div>}
            <div className='flex flex-col max-w-[500px] max-h-[500px] m-auto p-4'>
                <label className='text-black-500 font-bold text-lg'>Title</label>
                <input
                    className='border-2 h-10 rounded-md'
                    type='text'
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
                <label className='text-black-500 font-bold text-lg'>Content</label>
                <input
                    className='border-2 h-10 rounded-md'
                    type='text'
                    value={note.content}
                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
                <button
                    className='bg-red-700 rounded border-white m-auto p-2 mt-2 text-white'
                    onClick={handleUpdate}
                >
                    Update Note
                </button>
            </div>
        </>
    );
};

export default UpdateNote;
