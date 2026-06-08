const Book =
require("../models/Book");

exports.addBook =
async (req, res) => {

  try {

    const book =
    await Book.create(
      req.body
    );

    res.status(201)
    .json(book);

  } catch (error) {

    res.status(500)
    .json({
      message:
      error.message
    });

  }

};

exports.getBooks =
async (req, res) => {

  try {

    const books =
    await Book.find()
    .populate(
      "category",
      "categoryName"
    );

    res.json(
      books
    );

  } catch (error) {

    res.status(500)
    .json({
      message:
      error.message
    });

  }

};

exports.getBookById =
async (req, res) => {

  try {

    const book =
    await Book.findById(
      req.params.id
    )
    .populate(
      "category",
      "categoryName"
    );

    if (!book) {

      return res
      .status(404)
      .json({
        message:
        "Book not found"
      });

    }

    res.json(book);

  } catch (error) {

    res.status(500)
    .json({
      message:
      error.message
    });

  }

};

exports.updateBook =
async (req, res) => {

  try {

    const book =
    await Book.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new: true
      }

    )
    .populate(
      "category",
      "categoryName"
    );

    res.json(book);

  } catch (error) {

    res.status(500)
    .json({
      message:
      error.message
    });

  }

};

exports.deleteBook =
async (req, res) => {

  try {

    await Book.findByIdAndDelete(
      req.params.id
    );

    res.json({

      message:
      "Book deleted"

    });

  } catch (error) {

    res.status(500)
    .json({
      message:
      error.message
    });

  }

};