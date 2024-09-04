// routes/notesRoutes.js
const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const multer = require('multer');

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

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), notesController.uploadNote);
router.get("/getFiles", notesController.getAllFiles);
router.get("/getFiles/:id", notesController.getNotesByID);

module.exports = router;





// Routes related to notes

// router.get('/notes', notesController.getAllNotes);
// router.get('/notes/:id', notesController.getNoteById);
// router.post('/notes', notesController.createNote);
// router.put('/notes/:id', notesController.updateNote);
// router.delete('/notes/:id', notesController.deleteNote);


