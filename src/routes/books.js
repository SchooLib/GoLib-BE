const express = require("express");
const router = express.Router();
const {
  retriveBooks,
  addBook,
  retriveBook,
  removeBooks,
  updateBooks,
  reviewBook,
} = require("../controllers/bookControllers");
const { upload } = require("../middleware/multerMiddleware");
const useFirebase = require("../middleware/firebaseMiddleware");
const {
  authentificationUser,
  authentificationAdmin,
} = require("../middleware/token");

router.get("/", retriveBooks);
router.get("/:id", retriveBook);
router.post("/", authentificationAdmin, upload, useFirebase, addBook);
router.put("/:id", authentificationAdmin, upload, useFirebase, updateBooks);
router.delete("/:id", authentificationAdmin, removeBooks);
router.post("/review", authentificationUser, reviewBook);

module.exports = router;
