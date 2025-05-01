const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');
const {
  getNotes, addNote, updateNote, deleteNote
} = require('../controllers/notesController');

router.use(requireAuth);

router.get('/', getNotes);
router.post('/', addNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
