const { createBookGenres } = require("../repositories/genreRepository");
const {
  createBook,
  readBooks,
  readBook,
  deleteBooks,
} = require("../services/bookServices");

exports.addBook = async (req, res) => {
  try {
    const newBook = await createBook(req.body);

    for (const genreId of req.body.genres) {
      await createBookGenres({
        bookId: newBook.id,
        genreId: genreId,
      });
    }

    res.status(200).json({
      meta: {
        status: "success",
        message: "The book has been successfully added to the database.",
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

exports.retriveBooks = async (req, res) => {
  try {
    const books = await readBooks();
    res.status(200).json({
      meta: {
        status: "success",
        message: "Books retrieved successfully",
        code: 200,
      },
      data: books,
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

exports.retriveBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await readBook(id);
    res.status(200).json({
      meta: {
        status: "success",
        message: "Book retrieved successfully",
        code: 200,
      },
      data: book,
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

exports.removeBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await readBook(id);
    if(!book){
      res.status(404).json({
        meta: {
          status: "success",
          message: `Book with id ${id} not found!`,
          code: 404,
        },
        data: {},
      });
      return
    }

    const deletedBook = await deleteBooks(book);
    res.status(200).json({
      meta: {
        status: "success",
        message: "Book deleted successfully",
        code: 200,
      },
      data: deletedBook,
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
