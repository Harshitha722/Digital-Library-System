const path = require("path");
const fs = require("fs");
const EBook = require("../models/EBook");

exports.uploadEBook = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    const { title, author, description, category } = req.body;

    const ebook = await EBook.create({
      title,
      author,
      description,
      category,
      pdfFile: req.file.path.replace(/\\/g, "/"),
      uploadedBy: req.user._id
    });

    res.status(201).json(ebook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEBooks = async (req, res) => {
  try {
    const ebooks = await EBook.find()
      .populate("category", "categoryName")
      .populate("uploadedBy", "name email");
    res.json(ebooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEBookById = async (req, res) => {
  try {
    const ebook = await EBook.findById(req.params.id)
      .populate("category", "categoryName")
      .populate("uploadedBy", "name email");

    if (!ebook) {
      return res.status(404).json({ message: "EBook not found" });
    }

    res.json(ebook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEBook = async (req, res) => {
  try {
    const ebook = await EBook.findById(req.params.id);

    if (!ebook) {
      return res.status(404).json({ message: "EBook not found" });
    }

    const pdfPath = path.join(__dirname, "..", ebook.pdfFile);
    if (fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath);
    }

    await ebook.deleteOne();

    res.json({ message: "EBook deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.downloadEBook = async (req, res) => {
  try {
    const ebook = await EBook.findById(req.params.id);

    if (!ebook) {
      return res.status(404).json({ message: "EBook not found" });
    }

    const filePath = path.join(__dirname, "..", ebook.pdfFile);
    res.download(filePath, `${ebook.title}.pdf`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
