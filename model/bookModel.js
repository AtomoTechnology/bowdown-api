const mongoose = require('mongoose');
const slugify = require('slugify');
const booksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    abbreviation: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: String,
  },
  {}
);

booksSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const books = mongoose.model('Book', booksSchema);

module.exports = books;
