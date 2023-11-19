const { Router } = require('express');
const { getNote, saveNote, updateNote, deleteNote, getOneNote } = require('../controllers/noteControllers');
const checkAuth = require('../utils/checkAuth');
const { notesValidation } = require('../validation/notesValidation');

const router = Router();

router.get('/notes', checkAuth, getNote);
router.post('/notes/save', checkAuth, saveNote);
router.get('/notes/oneNote/:id', checkAuth, getOneNote);
router.patch('/notes/update/:id', checkAuth, updateNote);
router.delete('/notes/delete/:id', checkAuth, deleteNote); 

module.exports = router;