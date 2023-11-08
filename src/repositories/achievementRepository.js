const { Achievement } = require("../models");

exports.create = (data) => {
  return Achievement.create(data);
};

exports.reads = () => {
  return Achievement.findAll();
};

exports.readOne = (id) => {
  return Achievement.findOne({ where: { id } });
};

exports.update = (id, data) => {
  return Achievement.update(data, {
    where: {
      id,
    },
  });
};

exports.delete = (data) => {
  return data.destroy();
};
