const achievementRepository = require("../repositories/achievementRepository");

// create achievement
exports.createAchievement = (data) => {
  return achievementRepository.create(data);
};

// show all achievements
exports.readAllAchievements = (limit, offset) => {
  return achievementRepository.reads(limit, offset)
};

// show achievement by ID
exports.readAchievement = (id) => {
  return achievementRepository.readOne(id);
};

// update achievement
exports.updateAchievement = (id, data) => {
  return achievementRepository.update(id, data);
};

// delete achievement
exports.deleteAchievement = (data) => {
  return achievementRepository.delete(data);
};
