const express = require('express')
const authController = require('./../controllers/authController')
const verseDayController = require('./../controllers/verseDayController')

const router = express.Router()

router
  .route('/')
  .get(verseDayController.GetAll)
  .post(authController.protect, authController.restrictTo('admin', 'manager'), verseDayController.Create)

router
  .route('/:id')
  .get(verseDayController.FindOne)
  .delete(authController.protect, authController.restrictTo('admin'), verseDayController.Destroy)

router.get('/generate', authController.protect, authController.restrictTo('admin'), verseDayController.getVerseOfTheDay)

module.exports = router
