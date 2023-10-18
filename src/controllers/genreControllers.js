const {createGenres, readGenres} = require("../services/genreServices")


exports.addGenres = async (req, res) => {
  try {
    const newGenre = await createGenres(req.body);

    res.status(200).json({
      meta: {
        status: "success",
        message: "The genre has been successfully added to the database.",
        code: 200,
      },
      data: newGenre,
    });
  } catch (error) {
    res.status(400).json({
      meta: {
        status: "failed",
        message: error.message,
        code: 400,
      },
      data: {},
    });
  }
}

exports.retriveGenres = async (req, res) => {
  try {
    const genres = await readGenres();
    res.status(200).json({
      meta: {
        status: "success",
        message: "genres retrieved successfully",
        code: 200,
      },
      data: genres,
    });
  } catch (error) {
    res.status(400).json({
      meta: {
        status: "failed",
        message: error.message,
        code: 400,
      },
      data: {},
    });
  }
};
