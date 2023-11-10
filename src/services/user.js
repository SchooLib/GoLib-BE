const { Encription, Decript } = require("../middleware/bicrypt");
const { creataeToken } = require("../middleware/token");
const repositories = require("../repositories/user");

exports.createUser = async (data) => {
  const password = await Encription(data.password);
  return repositories.createUser({ ...data, password });
};

exports.getToken = async (data, dbPassword) => {
  console.log(data);
  const validateUser = await Decript(data.password, dbPassword);
  if (!validateUser) {
    throw new Error("Password inhcorrect");
  }
  console.log(data);
  return creataeToken({ role: data.role, id: data.id });
};

exports.getOneLogin = (data) => {
  return repositories.getOneUser(data);
};

exports.getUserById = (id) => {
  return repositories.getUserById(id);
};

exports.getAllUsers = (limit, offset) => {
  return repositories.getAllUsers(limit, offset);
};

exports.updateUser = (id, data) => {
  return repositories.update(id, data);
};

exports.deleteUsers = (data) => {
  return repositories.delete(data);
};

exports.getOneLoginAdmin = (data) => {
  return repositories.getOneLoginAdmin(data);
};
