const { signInWithEmailAndPassword } = require("firebase/auth");
const { storage, auth } = require("../../config/firebase");
const {
  createBook,
  readBooks,
  readBook,
  deleteBooks,
  editBook,
  createRiviews,
} = require("../services/bookServices");
const {
  removeClassificationBooks,
  createClassificationBooks,
} = require("../services/classificationServices");

const { ref, deleteObject } = require("firebase/storage");
const config = require("../../config/config");
const { updateUser, getUserById } = require("../services/user");

exports.addBook = async (req, res) => {
  try {
    const newBook = await createBook({
      ...req.body,
      image: req.imageName,
    });

    if (req.body.classifications) {
      createClassificationBooks({
        bookId: newBook.id,
        classificationId: req.body.classifications,
      });
    }

    res.status(200).json({
      meta: {
        status: "success",
        message: "The book has been successfully added to the database.",
        code: 200,
      },
      data: {
        ...newBook?.dataValues,
        image: `https://firebasestorage.googleapis.com/v0/b/golib-59a06.appspot.com/o/images%2F${
          newBook.image.split("/")[1]
        }?alt=media`,
      },
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
    const offsetAsNumber = Number.parseInt(req.query.page);
    const limitAsNumber = Number.parseInt(req.query.limit);

    let page = 0;
    if (!Number.isNaN(offsetAsNumber) && offsetAsNumber > 0) {
      page = offsetAsNumber;
    }

    let size = 1000000;
    if (
      !Number.isNaN(limitAsNumber) &&
      limitAsNumber > 0 &&
      limitAsNumber < 1000000
    ) {
      size = limitAsNumber;
    }

    const books = await readBooks(size, page);

    // Map the books and create a modified response
    const modifiedBooks = books.rows.map((book) => {
      // Include only the necessary properties
      return {
        id: book.id,
        title: book.title,
        image: `https://firebasestorage.googleapis.com/v0/b/golib-59a06.appspot.com/o/images%2F${
          book.image.split("/")[1]
        }?alt=media`,
        publisher: book.publisher,
        year: book.year,
        review_keys: book.review_keys,
        review_point: book.review_point,
        isAvailable: book.isAvailable,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
        classifications: book.classifications,
      };
    });

    res.status(200).json({
      meta: {
        status: "success",
        message: "Books retrieved successfully",
        code: 200,
      },
      data: {
        totalContents: books.count,
        totalPages: Math.ceil(books.count / size),
        currentPage: page + 1,
        contents: modifiedBooks,
      },
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
    if (!book) {
      res.status(404).json({
        meta: {
          status: "success",
          message: `Book with id ${id} not found!`,
          code: 404,
        },
        data: {},
      });
      return;
    }
    res.status(200).json({
      meta: {
        status: "success",
        message: "Book retrieved successfully",
        code: 200,
      },
      data: {
        ...book?.dataValues,
        image: `https://firebasestorage.googleapis.com/v0/b/golib-59a06.appspot.com/o/images%2F${
          book?.image.split("/")[1]
        }?alt=media`,
      },
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

exports.updateBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await readBook(id);
    if (!book) {
      res.status(404).json({
        meta: {
          status: "failed",
          message: `Book with id ${id} not found!`,
          code: 404,
        },
        data: {},
      });
      return;
    }

    let bodyData = req.body;

    if (req.imageName) {
      await signInWithEmailAndPassword(
        auth,
        config.firebaseUser,
        config.firebaseAuth
      );
      bodyData = { ...req.body, image: req.imageName };
      const desertRef = ref(storage, book.image);
      await deleteObject(desertRef);
    }

    const updatedBook = await editBook(id, bodyData);

    if (req.body.classifications) {
      await removeClassificationBooks(id);
      for (const classificationId of req.body.classifications) {
        await createClassificationBooks({
          bookId: book.id,
          classificationId: classificationId,
        });
      }
    }

    const newUpdatedBook = await readBook(id);
    res.status(200).json({
      meta: {
        status: "success",
        message: "Book updated successfully",
        code: 200,
      },
      data: {
        ...newUpdatedBook?.dataValues,
        image: `https://firebasestorage.googleapis.com/v0/b/golib-59a06.appspot.com/o/images%2F${
          newUpdatedBook?.image.split("/")[1]
        }?alt=media`,
      },
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
    if (!book) {
      res.status(404).json({
        meta: {
          status: "success",
          message: `Book with id ${id} not found!`,
          code: 404,
        },
        data: {},
      });
      return;
    }

    if (book.image) {
      await signInWithEmailAndPassword(
        auth,
        config.firebaseUser,
        config.firebaseAuth
      );
      const desertRef = ref(storage, book.image);
      await deleteObject(desertRef);
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

exports.reviewBook = async (req, res) => {
  try {
    const newReview = await createRiviews({ ...req.body, userId: req.user.id });

    let bonusPoints = 0;

    if (req.body.content) {
      const totalKeys = req.body.key.length;
      const includedKeys = req.body.key.filter((keyword) =>
        req.body.content.includes(keyword)
      ).length;

      if (includedKeys === totalKeys) {
        bonusPoints = req.body.point;
      } else if (includedKeys === 1) {
        bonusPoints = req.body.point * 0.2;
      } else {
        bonusPoints = req.body.point * 0.5;
      }
      const user = await getUserById(req.user.id);
      await updateUser(req.user.id, { point: bonusPoints + user.point });
    }

    res.json({
      meta: {
        status: "success",
        message: `Book review posted successfully! user got ${bonusPoints} point`,
        code: 200,
      },
      data: newReview,
    });
  } catch (error) {
    res.status(400).json({
      meta: {
        status: "failed",
        message: error.message,
        code: 400,
      },
      data: error.message,
    });
  }
};
