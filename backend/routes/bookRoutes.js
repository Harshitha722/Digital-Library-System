const express =
require("express");

const router =
express.Router();

const {

 addBook,

 getBooks,

 getBookById,

 updateBook,

 deleteBook

}
=
require(
 "../controllers/bookController"
);
const upload = require("../middleware/uploadMiddleware");
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.post(
	"/",
	protect,
	authorizeRoles('admin','librarian'),
	upload.single("cover"),
	addBook
);

router.get(
	"/",
	protect,
	getBooks
);

router.get(
	"/:id",
	protect,
	getBookById
);

router.put(
	"/:id",
	protect,
	authorizeRoles('admin','librarian'),
	upload.single("cover"),
	updateBook
);

router.delete(
	"/:id",
	protect,
	authorizeRoles('admin','librarian'),
	deleteBook
);

module.exports =
router;