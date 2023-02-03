const catchAsync = require('../helpers/catchAsync');
const FavoriteSong = require('../model/favoriteSongModel');
const factory = require('./handlerFactory');

exports.GetAll = factory.getAll(FavoriteSong);
exports.Create = factory.createOne(FavoriteSong);
exports.deleteFavoriteSong = factory.deleteOne(FavoriteSong);
exports.updateFavoriteSong = factory.updateOne(FavoriteSong);
exports.GetOneFavoriteSong = factory.getOne(FavoriteSong);
