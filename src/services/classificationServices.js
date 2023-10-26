const classificationRepository = require("../repositories/classificationRepository");

//create user
exports.createClassification = (data) => {
  return classificationRepository.create(data);
};

exports.readClassifications = () => {
  return classificationRepository.read();
};

exports.readClassification = (id) => {
  return classificationRepository.readOne(id)
}

exports.editClassifications = (id, data) => {
  return classificationRepository.update(id, data);
};

exports.removeClassifications = (id) => {
  return classificationRepository.delete(id);
};

exports.createClassificationBooks = (data) => {
  return classificationRepository.createBookClassification(data);
};

exports.removeClassificationBooks = (id) => {
  return classificationRepository.deleteBookClassification(id);
};
