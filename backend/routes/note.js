const { Router } = require('express');
const { getNote, saveNote, updateNote, deleteNote, getOneNote } = require('../controllers/noteControllers');
const checkAuth = require('../utils/checkAuth');
const { notesValidation } = require('../validation/notesValidation');
const { getNoteData, noteDataCreate } = require('../controllers/noteDataController');

const router = Router();

router.get('/notes', checkAuth, getNote);
router.post('/notes/save', checkAuth, saveNote);
router.get('/notes/oneNote/:id', checkAuth, getOneNote);
router.patch('/notes/update/:id', checkAuth, updateNote);
router.delete('/notes/delete/:id', checkAuth, deleteNote); 

// router.get('/note-data', checkAuth, getNoteData);
// router.post('/note-data/create', checkAuth, noteDataCreate);

module.exports = router;