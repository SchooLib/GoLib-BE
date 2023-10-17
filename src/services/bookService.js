const bookRepository = require("../repositories/bookRepository")

//create user
exports.createBook = (data) => {
  return bookRepository.create(data)
}