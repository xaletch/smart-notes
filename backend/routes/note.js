const { Router } = require('express');

const noteModel = require('../models/noteModel');

const { getNote, saveNote, updateNote, deleteNote, getOneNote } = require('../controllers/noteControllers');
const checkAuth = require('../utils/checkAuth');
const { notesValidation } = require('../validation/notesValidation');
const { getNoteData, noteDataCreate } = require('../controllers/noteDataController');
const { upload } = require('../controllers/uploadImd');

const router = Router();

router.get('/notes', checkAuth, getNote, async (req, res) => {
    try {
        const { search } = req.query;
        const searchNote = await noteModel.find({ user: req.userId });
        res.send(searchNote);
    }
    catch (err) {
        console.log(err);
        res.send({message: "ошибка", err})
    }
});
router.post('/notes/save', checkAuth, saveNote);
router.get('/notes/oneNote/:id', checkAuth, getOneNote);
router.patch('/notes/update/:id', checkAuth, updateNote);
router.delete('/notes/delete/:id', checkAuth, deleteNote); 
router.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
    const imageUrl = req.file ? `uploads/${req.file.originalname}` : req.body.imageUrl;
    res.json({url: imageUrl});
});

// router.get('/note-data', checkAuth, getNoteData);
// router.post('/note-data/create', checkAuth, noteDataCreate);

module.exports = router;