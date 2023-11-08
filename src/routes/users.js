var express = require("express");
const {
  createUser,
  loginUser,
  getUserById,
  getAllUser,
  editUser,
  deleteUser,
  createAdmin,
  loginUserAdmin,
} = require("../controllers/user");
const {
  authentificationUser,
  authentificationAdmin,
} = require("../middleware/token");
const router = express.Router();
const { upload } = require("../middleware/multerMiddleware");
const useFirebase = require("../middleware/firebaseMiddleware");

/* GET users lsisting. */
router.post("/", authentificationAdmin, upload, useFirebase, createUser);
router.post("/login", loginUser);
router.get("/:idUser", authentificationUser, getUserById);
router.get("/", getAllUser);
router.put("/:idUser", authentificationAdmin, upload, useFirebase, editUser);
router.delete("/:idUser", authentificationAdmin, deleteUser);

router.post("/admin", createAdmin);
router.post("/admin/login", loginUserAdmin);
module.exports = router;
