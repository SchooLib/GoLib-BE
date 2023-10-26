const { books, classifications } = require("../models");

exports.create = (data) => {
  return books.create(data);
};

exports.read = () => {
  return books.findAndCountAll({
    include: [
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
