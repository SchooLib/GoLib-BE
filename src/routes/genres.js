const { addGenres, retriveGenres } = require("../controllers/genreControllers");
const express = require("express");
const router = express.Router();

router.get('/', retriveGenres)
router.post("/", addGenres);

module.exports = router;
