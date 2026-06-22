const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const upload = require("../middleware/pdfUploadMiddleware");

const {
  uploadEBook,
  getEBooks,
  getEBookById,
  deleteEBook,
  downloadEBook
} = require("../controllers/eBookController");

router.post("/", protect, authorizeRoles("admin", "librarian"), upload.single("pdfFile"), uploadEBook);
router.get("/", protect, getEBooks);
router.get("/download/:id", protect, downloadEBook);
router.get("/:id", protect, getEBookById);
router.delete("/:id", protect, authorizeRoles("admin", "librarian"), deleteEBook);

module.exports = router;
