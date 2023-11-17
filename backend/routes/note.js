const { Router } = require('express');
const { getNote, saveNote, updateNote, deleteNote } = require('../controllers/noteControllers');

const router = Router();

router.get('/notes', getNote);
router.post('/notes/save', saveNote);
router.post('/notes/update', updateNote);
router.post('/notes/delete', deleteNote);


module.exports = router;