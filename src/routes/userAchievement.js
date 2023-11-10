const express = require("express");
const router = express.Router();
const {
  addUserAchievement,
  showAllUserAchievements,
  showUserAchievement,
  updateUserAchievement,
  removeUserAchievement,
} = require("../controllers/userAchievementController");

router.get("/", showAllUserAchievements);
router.get("/:id", showUserAchievement);
router.post("/", addUserAchievement);
router.put("/:id", updateUserAchievement);
router.delete("/:id", removeUserAchievement);

module.exports = router;
