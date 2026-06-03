const express =
require("express");

const router =
express.Router();

const {
  getUsers,
  addLibrarian
}
=
require(
  "../controllers/userController"
);

router.get(
  "/",
  getUsers
);

router.post(
  "/librarian",
  addLibrarian
);

module.exports =
router;