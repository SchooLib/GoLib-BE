const express = require("express");
const router = express.Router();
const {
  addAchievement,
  showAllAchievements,
  showAchievement,
  updateAchievement,
  removeAchievement,
} = require("../controllers/achievementController");
const {upload} = require("../middleware/multerMiddleware");
const useFirebase = require("../middleware/firebaseMiddleware")

router.get("/", showAllAchievements);
router.get("/:id", showAchievement);
router.post("/", upload, useFirebase, addAchievement);
router.put("/:id", upload, useFirebase, updateAchievement);
router.delete("/:id", removeAchievement);

module.exports = router;
