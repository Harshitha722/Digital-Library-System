require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB =
require("./config/db");

const authRoutes =
require("./routes/authRoutes");

const bookRoutes =
require("./routes/bookRoutes");

const categoryRoutes =
require("./routes/categoryRoutes");

const borrowRoutes = require("./routes/borrowRoutes");
const fineRoutes = require("./routes/fineRoutes");

const dashboardRoutes =
require("./routes/dashboardRoutes");

const userRoutes =
require("./routes/userRoutes");

const errorHandler =
require("./middleware/errorMiddleware");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

// Serve uploaded files
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/books",
  bookRoutes
);

app.use(
  "/api/categories",
  categoryRoutes
);

app.use(
  "/api/borrows",
  borrowRoutes
);

app.use(
  "/api/fines",
  fineRoutes
);

const ebookRoutes = require("./routes/eBookRoutes");
app.use(
  "/api/ebooks",
  ebookRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.get("/", (req, res) => {

  res.send(
    "Digital Library API Running"
  );

});

app.use(errorHandler);

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server Running On Port ${PORT}`
  );

});