// models/noteModel.js

const mongoose = require('mongoose');

// Schema for the Note model
const noteSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    fileDescription: { type: String, default: '' },
    tags: { type: [String], default: [] },
    files: { type: [String], default: [] },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;

