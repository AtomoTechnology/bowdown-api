const express = require('express');
const authController = require('./../controllers/authController');
const songController = require('./../controllers/songController');

const router = express.Router();
router.use(authController.fakeProtect);

// router.use(authController.protect, authController.restrictTo('admin'));
router.post('/multiples', songController.CreateMultiples);
router.route('/').get(songController.GetAll).post(songController.Create);
router.route('/:id').get(songController.GetOneSong).patch(songController.updateSong).delete(songController.deleteSong);

module.exports = router;
