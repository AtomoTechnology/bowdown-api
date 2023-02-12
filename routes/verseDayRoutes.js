const express = require('express');
const { ValidatelanguageAndVersion } = require('../controllers/bibleController');
const authController = require('./../controllers/authController');
const verseDayController = require('./../controllers/verseDayController');

const router = express.Router();

// router.use(authController.protect);
// router.use(authController.protect);

router
  .route('/')
  .get(authController.protect, verseDayController.GetAll)
  .post(authController.protect, authController.restrictTo('admin', 'manager'), verseDayController.Create);

router
  .route('/:id')
  .get(verseDayController.GetOne)
  .delete(authController.protect, authController.restrictTo('admin'), verseDayController.Destroy);

router.get('/verse/today', verseDayController.getVerseOfTheDay);

module.exports = router;
