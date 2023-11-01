var express = require('express');
const { 
  createUser, 
  loginUser, 
  getUserById, 
  getAllUser,
  editUser,
  deleteUser,
  createAdmin,
  loginUserAdmin
} = require('../controllers/user');
const { authentificationUser, authentificationAdmin } = require('../middleware/token');
const router = express.Router();

/* GET users lsisting. */
router.post('/',authentificationAdmin,createUser)
router.post('/login',loginUser)
router.get('/:idUser',authentificationUser,getUserById)
router.get('/',getAllUser)
router.put('/:idUser',authentificationAdmin,editUser)
router.delete('/:idUser',authentificationAdmin,deleteUser)

router.post('/admin',createAdmin)
router.post('/admin/login',loginUserAdmin)
module.exports = router;
