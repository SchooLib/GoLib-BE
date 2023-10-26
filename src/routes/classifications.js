const {
  addClassifications,
  retriveClassifications,
  retriveClassification,
  deleteClassifications,
  updateClassifications,
} = require("../controllers/classificationControllers");
const express = require("express");
const router = express.Router();

router.get("/", retriveClassifications);
router.get("/:id", retriveClassification);
router.post("/", addClassifications);
router.put("/:id", updateClassifications);
router.delete("/:id", deleteClassifications);

module.exports = router;
