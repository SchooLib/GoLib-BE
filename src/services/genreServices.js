const genreRepository = require("../repositories/genreRepository")

//create user
exports.createGenres = (data) => {
  return genreRepository.create(data)
}

exports.readGenres = () => {
  return genreRepository.read()
}

exports.createGenreBooks = (data) => {
  return genreRepository.createBookGenres(data)
}