const Book = require("../models/Book");

exports.getBooks = async(req,res)=>{

    const books =
    await Book.find()
    .populate("category");

    res.json(books);
};

exports.addBook = async(req,res)=>{

    const book =
    await Book.create(req.body);

    res.status(201).json(book);
};

exports.updateBook = async(req,res)=>{

    const updatedBook =
    await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.json(updatedBook);
};

exports.deleteBook = async(req,res)=>{

    await Book.findByIdAndDelete(
        req.params.id
    );

    res.json({
        message:"Book Deleted"
    });
};