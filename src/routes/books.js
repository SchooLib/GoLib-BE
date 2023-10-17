const express = require('express');
const router = express.Router();
const {createBook} = require("../controllers/bookControllers")


router.get('/', createBook);

module.exports = router;
