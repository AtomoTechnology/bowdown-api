const catchAsync = require('../helpers/catchAsync');
const Book = require('../model/bookModel');
const factory = require('./handlerFactory');

exports.GetAll = factory.getAll(Book);

exports.Create = factory.createOne(Book);
exports.CreateMultiples = factory.createNultiples(Book);

exports.deleteBook = factory.deleteOne(Book);
exports.updateBook = factory.updateOne(Book);
exports.GetOneBook = factory.getOne(Book, {
  path: 'songs',
});
