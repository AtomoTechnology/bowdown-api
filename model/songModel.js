const mongoose = require('mongoose');
const slugify = require('slugify');
const songsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    book: {
      type: mongoose.Schema.ObjectId,
      ref: 'Book',
      required: [true, 'A song required a Book id'],
    },
    slug: String,
    views: Number,
    likes: Number,
    num: Number,
    videos: String,
    lyrics: String,
    language: String,
    songId: String,
    lyricsMarkdown: String,
    lyricsHtml: String,
    slug: String,
  },
  {}
);

songsSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const songs = mongoose.model('Song', songsSchema);

module.exports = songs;
