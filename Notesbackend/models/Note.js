const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title:{type:String , required:true , unique:true},
    content:{type:String , required:true}
},{
    versionKey:false
});

const NoteModel = mongoose.model('Note' , NoteSchema);

module.exports = NoteModel;