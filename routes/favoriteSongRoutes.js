const express = require('express');
const authController = require('./../controllers/authController');
const favoriteSongController = require('./../controllers/favoriteSongController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(favoriteSongController.GetAll)
  .post(authController.restrictTo('user'), favoriteSongController.Create);

router
  .route('/:id')
  .get(favoriteSongController.GetOneFavoriteSong)
  .patch(authController.restrictTo('user', 'admin'), favoriteSongController.updateFavoriteSong)
  .delete(authController.restrictTo('user', 'admin'), favoriteSongController.deleteFavoriteSong);

module.exports = router;
