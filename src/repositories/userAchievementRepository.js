const { UserAchievement } = require("../models");

exports.create = (data) => {
  return UserAchievement.create(data);
};

exports.reads = () => {
  return UserAchievement.findAll();
};

exports.readOne = (id) => {
  return UserAchievement.findOne({ where: { id } });
};

exports.update = (id, data) => {
  return UserAchievement.update(data, {
    where: {
      id,
    },
  });
};

exports.delete = (data) => {
  return data.destroy();
};
