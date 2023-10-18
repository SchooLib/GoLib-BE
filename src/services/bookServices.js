const bookRepository = require("../repositories/bookRepository");

//create user
exports.createBook = (data) => {
  return bookRepository.create(data);
};

exports.readBooks = () => {
  return bookRepository.read().then((results) => {
    const transformedResult = results.rows.map((book) => {
      return {
        ...book.dataValues,
        genres: book.genres.map((genre) => genre.name),
      };
    });

    const transformedResponse = {
      count: results.count,
      rows: transformedResult,
    };

    return transformedResponse;
  });
};

exports.readBook = (id) => {
  return bookRepository.readOne(id);
};

exports.deleteBooks = (data) => {
  return bookRepository.delete(data);
};
