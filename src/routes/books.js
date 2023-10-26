const express = require('express');
const router = express.Router();
const {retriveBooks, addBook, retriveBook, removeBooks, updateBooks} = require("../controllers/bookControllers")


router.get('/', retriveBooks);
router.get('/:id', retriveBook)
router.post('/', addBook);
router.put('/:id', updateBooks)
router.delete('/:id', removeBooks)

module.exports = router;
