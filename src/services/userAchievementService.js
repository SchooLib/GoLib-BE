const userAchievementRepository = require("../repositories/userAchievementRepository");

// create userAchievement
exports.createUserAchievement = (data) => {
  return userAchievementRepository.create(data);
};

// show all userAchievements
exports.readAllUserAchievements = (limit, offset) => {
  return userAchievementRepository.reads(limit, offset);
};

// show userAchievement by ID
exports.readUserAchievement = (id) => {
  return userAchievementRepository.readOne(id);
};

// update userAchievement
exports.updateUserAchievement = (id, data) => {
  return userAchievementRepository.update(id, data);
};

// delete userAchievement
exports.deleteUserAchievement = (data) => {
  return userAchievementRepository.delete(data);
};
