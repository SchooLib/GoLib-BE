const bookRepository = require("../repositories/bookRepository");

//create user
exports.createBook = (data) => {
  return bookRepository.create(data);
};

exports.readBooks = (limit, offset) => {

  return bookRepository.read(limit, offset);
};

exports.readBook = (id) => {
  return bookRepository.readOne(id);
};

exports.editBook = (id, data) => {
  return bookRepository.update(id, data);
};

exports.deleteBooks = (data) => {
  return bookRepository.delete(data);
};
