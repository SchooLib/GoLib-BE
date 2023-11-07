const { User } = require("../models");

exports.createUser = (data) => {
  return User.create(data);
};

exports.getOneUser = (data) => {
  return User.findOne({
    where: { nisn: data.nisn },
  });
};

exports.getOneLoginAdmin = (data) => {
  return User.findOne({
    where: { username: data.username },
  });
};

exports.getUserById = (id) => {
  return User.findOne({
    where: { id: id },
  });
};

exports.getUserByUsername = (username) => {
  return User.findOne({
    where: { username },
  });
};

exports.getUserByNisn = (nisn) => {
  return User.findOne({
    where: { nisn },
  });
};

exports.getAllUsers = () => {
  return User.findAll({
    where: { role: "user" },
  });
};

exports.update = (id, data) => {
  return User.update(data, {
    where: {
      id,
    },
  });
};

exports.delete = (data) => {
  return data.destroy();
};
