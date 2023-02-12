const { connect } = require('../db');
const AppError = require('../helpers/AppError');
const factory = require('./factoryController');
const FavouriteSong = require('../schemas/favouriteSong');

exports.GetAll = factory.all(FavouriteSong);
exports.Create = factory.create(FavouriteSong, ['UserId', 'SongId']);
exports.Destroy = factory.destroy(FavouriteSong);
