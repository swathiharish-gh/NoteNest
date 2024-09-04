const Notes = require('../models/noteModel');
const multer = require('multer');

// Ensure storage setup matches usage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = './files';
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

// Handle file upload
const uploadNote = async (req, res) => {
    try {
        const fileName = req.body.title;
        const fileDescription = req.body.description;
        const tags = req.body.tags;
        const uploadedBy = req.body.userId;

        console.log("Uploading Note Data:", {
            fileName,
            fileDescription,
            tags,
            uploadedBy
        }); // Debugging line

        const newFile = new Notes({
            fileName: fileName,
            fileDescription: fileDescription,
            tags: tags,
            files: [fileName],
            uploadedBy: uploadedBy
        });

        await newFile.save();
        res.send({ status: "OK" });

    } catch (error) {
        console.error("Error Uploading Note:", error);
        res.status(400).json({ error: error.message });
    }
};


// Fetch all files
const getAllFiles = async (req, res) => {
    try {
        const { title } = req.query;
        let filter = {};

        if (title) {
            filter.fileName = { $regex: title, $options: 'i' };
        }

        const files = await Notes.find(filter);
        console.log("Server-side Filter:", filter);
        console.log("Fetched Files:", files);
        res.json({ data: files });
    } catch (error) {
        console.error("Error Fetching Files:", error);
        res.status(500).json({ error: error.message });
    }
};



// Fetch note by ID
const getNotesByID = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Notes.findById(noteId);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    uploadNote,
    getAllFiles,
    getNotesByID
};