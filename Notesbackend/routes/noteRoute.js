const express = require('express');
const NoteModel = require('../models/Note');
const note = express.Router();

note.post('/notes' , async (req,res)=>{
    try {
        const {title , content} = req.body;

        if(!title || !content){
            return res.status(404).json({msg:'Please Give title and content'});
        }

        const note = new NoteModel({title , content});
        await note.save();

        res.status(201).json({msg:'Note has been created' , note})
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});

note.get('/notes' , async (req,res)=>{
    try {
        const notes = await NoteModel.find();

        if(!notes){
            return res.status(404).json({msg:'Note has not found'})
        };

        res.status(201).json({msg:'All notes details', notes})

    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

note.get('/notes/:id' , async (req,res)=>{
    try {
        const {id} = req.params
        const note = await NoteModel.findById(id);

        if(!note){
            return res.status(404).json({msg:'Note not found with these id'})
        }

        res.status(201).json(note)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

note.put("/notes/:id" , async (req,res)=>{
    try {
        const {id}= req.params;
        const {title , content} = req.body;

        const note = await NoteModel.findByIdAndUpdate(id , {title , content});
        if(!note){
            return res.status(404).json({msg:'Note not found '})
        }

        await note.save()
        res.status(201).json({msg:'Note has been updated' , note})

    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

note.delete('/notes/:id' , async (req,res)=>{
    try {
        const {id}= req.params;

        const note = await NoteModel.findByIdAndDelete(id);
        if(!note){
            return res.status(404).json({msg:'Note not found '})
        }
        res.status(201).json({msg:'Note has been deleted' , note})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})





module.exports = note