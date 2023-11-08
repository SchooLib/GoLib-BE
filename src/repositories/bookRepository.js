const { books, classifications, bookReviews, User } = require("../models");

exports.create = (data) => {
  return books.create(data);
};

exports.read = (limit, offset) => {
  return books.findAndCountAll({
    limit,
    offset: offset * limit,
    include: [
      {
        model: bookReviews,
        attributes: ["id"],
        as: "reviews",
      },
      {
        model: classifications,
        as: "classifications",
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ],
  });
};

exports.readOne = (id) => {
  return books.findOne({
    where: {
      id,
    },
    include: [
      {
        model: bookReviews,
        attributes: ["id", "content", "rating", "userId"],
        as: "reviews",
        include: {
          model: User,
          attributes: ["username", "img"],
          as: "user"
        }
      },
      {
        model: classifications,
        as: "classifications",
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ],
  });
};

exports.update = (id, data) => {
  return books.update(data, {
    where: {
      id,
    },
  });
};

exports.delete = (data) => {
  return data.destroy();
};

exports.post = (data) => {
  return bookReviews.create(data);
};
