const mongoose = require('mongoose');

const favoriteSongSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  song: {
    type: mongoose.Schema.ObjectId,
    ref: 'Song',
    required: [true, 'A Favorite song required a Song ID'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A Favorite Song required a User ID'],
  },
});

favoriteSongSchema.index({ song: 1, user: 1 }, { unique: true });

favoriteSongSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'song',
    select: 'id title lyrics',
  });
  next();
});

const FavoriteSong = mongoose.model('FavoriteSong', favoriteSongSchema);
module.exports = FavoriteSong;
