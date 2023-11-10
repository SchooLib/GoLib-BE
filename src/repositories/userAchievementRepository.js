const { userAchievements } = require("../models");

exports.create = (data) => {
  return userAchievements.create(data);
};

exports.reads = () => {
  return userAchievements.findAll();
};

exports.readOne = (id) => {
  return userAchievements.findOne({ where: { id } });
};

exports.update = (id, data) => {
  return userAchievements.update(data, {
    where: {
      id,
    },
  });
};

exports.delete = (data) => {
  return data.destroy();
};
