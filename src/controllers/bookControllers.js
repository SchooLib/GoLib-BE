const { createBook } = require("../services/bookService");

exports.createBook = async (req, res) => {
  try {
    // const {
    //   title,
    //   image,
    //   publisher,
    //   year,
    //   clasification,
    //   booksGenres,
    //   review_keys,
    //   review_point,
    //   isAvailable,
    // } = req.body;

    const newBook = await createBook(req.body);

    res.status(200).json({
      meta: {
        status: "failed",
        message: error.message,
        code: 200,
      },
      data: newBook,
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
