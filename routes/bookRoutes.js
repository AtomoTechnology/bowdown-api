const express = require('express');
const authController = require('./../controllers/authController');
const bookController = require('./../controllers/bookController');

const router = express.Router();

router.use(authController.fakeProtect);
router.post('/multiples', bookController.CreateMultiples);
router.route('/').get(bookController.GetAll).post(bookController.Create);
router.route('/:id').get(bookController.GetOneBook).patch(bookController.updateBook).delete(bookController.deleteBook);

module.exports = router;
