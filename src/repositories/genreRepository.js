const { genres, bookGenres } = require("../models");

exports.create = (data) => {
  return genres.create(data);
};

exports.read = () => {
  return genres.findAll()
}

exports.readOne = (id) => {
  return genres.findByPk(id)
}

exports.createBookGenres = (data) => {
  return bookGenres.create(data)
}