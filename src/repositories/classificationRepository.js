const { Op } = require("sequelize");
const { classifications, bookClassifications } = require("../models");

exports.create = (data) => {
  return classifications.create(data);
};

exports.read = (limit, offset) => {
  return classifications.findAndCountAll({
    limit,
    offset: offset * limit,
  });
};

exports.readOne = (id) => {
  return classifications.findByPk(id);
};

exports.update = (id, data) => {
  return classifications.update(data, {
    where: {
      id,
    },
  });
};

exports.delete = (id) => {
  return classifications.destroy({ where: { id } });
};

exports.createBookClassification = (data) => {
  return bookClassifications.create(data);
};

exports.deleteBookClassification = (id) => {
  return bookClassifications.destroy({
    where: {
      bookId: id,
    },
  });
};
