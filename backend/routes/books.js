const express = require('express');
const router = express.Router();
const { getPopularBooks, getBookById, createBook, updateBook, deleteBook  } = require('../controllers/bookController');
const { createQuery, createAnswer, getQueries, deleteQuery, updateAnswer } = require('../controllers/queryController.js');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.get('/', getPopularBooks);
router.get('/:id', getBookById);

router.get('/queries', getQueries);
router.post('/:id/query', createQuery);
router.delete('/:id/query', deleteQuery);

router.post('/:id/query/:qid', createAnswer);
router.patch('/:id/query/:qid', updateAnswer);

router.post('/admin', createBook);
router.patch('/admin/:id', updateBook);
router.delete('/admin/:id', deleteBook);

module.exports = router;