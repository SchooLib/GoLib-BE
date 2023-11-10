const express = require("express");
const router = express.Router();
const {
  addAchievement,
  showAllAchievements,
  showAchievement,
  updateAchievement,
  removeAchievement,
  claimAchievement,
} = require("../controllers/achievementController");
const { upload } = require("../middleware/multerMiddleware");
const useFirebase = require("../middleware/firebaseMiddleware");
const {
  authentificationUser,
  authentificationAdmin,
} = require("../middleware/token");

router.get("/", showAllAchievements);
router.get("/:id", showAchievement);
router.post("/", upload, useFirebase, addAchievement);
router.put("/:id", upload, useFirebase, updateAchievement);
router.delete("/:id", authentificationAdmin, removeAchievement);
router.patch("/claim",  authentificationUser, claimAchievement);

module.exports = router;
