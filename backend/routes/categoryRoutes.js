const express = require("express");

const router = express.Router();

const {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory
} = require("../controllers/categoryController");

const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get("/", getCategories);

router.post(
  "/",
  protect,
  authorizeRoles('admin','librarian'),
  addCategory
);

router.put(
  '/:id',
  protect,
  authorizeRoles('admin','librarian'),
  updateCategory
);

router.delete(
  '/:id',
  protect,
  authorizeRoles('admin','librarian'),
  deleteCategory
);

module.exports = router;