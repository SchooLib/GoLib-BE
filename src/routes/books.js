const express = require("express");
const router = express.Router();
const {
  retriveBooks,
  addBook,
  retriveBook,
  removeBooks,
  updateBooks,
} = require("../controllers/bookControllers");
const { upload } = require("../middleware/multerMiddleware");
const useFirebase = require("../middleware/firebaseMiddleware");

router.get("/", retriveBooks);
router.get("/:id", retriveBook);
router.post("/", upload, useFirebase, addBook);
router.put("/:id", upload, useFirebase, updateBooks);
router.delete("/:id", removeBooks);

module.exports = router;
