const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

const {createBook, updateBook, deleteBook} = require('../controllers/bookController');
const {updateUser, deleteUser} = require('../controllers/userController');

router.use(requireAuth);

router.post('/', createBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);

router.patch('/user', updateUser);
router.delete('/user', deleteUser);

module.exports = router;