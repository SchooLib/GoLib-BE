const { books, genres, bookGenres } = require("../models");

exports.create = (data) => {
  return books.create(data);
};

exports.read = () => {
  return books.findAndCountAll({
    include: [
      {
        model: genres, 
        as: "genres", 
        attributes: ['name']
      },
    ],
  });
};

exports.readOne = (id) => {
  return books.findByPk(id);
};

exports.delete = (data) => {
  return data.destroy();
};
