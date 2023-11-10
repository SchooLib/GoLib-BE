const {
  addClassifications,
  retriveClassifications,
  retriveClassification,
  deleteClassifications,
  updateClassifications,
} = require("../controllers/classificationControllers");
const express = require("express");
const router = express.Router();
const {
  authentificationUser,
  authentificationAdmin,
} = require("../middleware/token");

router.get("/", retriveClassifications);
router.get("/:id", retriveClassification);
router.post("/", authentificationAdmin, addClassifications);
router.put("/:id", authentificationAdmin, updateClassifications);
router.delete("/:id", authentificationAdmin, deleteClassifications);

module.exports = router;
