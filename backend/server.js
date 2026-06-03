
require("dotenv").config();




const express = require("express");
const cors = require("cors");

const connectDB =
require("./config/db");

const authRoutes =
require("./routes/authRoutes");

const errorHandler =
require("./middleware/errorMiddleware");

const bookRoutes =
require("./routes/bookRoutes");

const categoryRoutes =
require("./routes/categoryRoutes");

const dashboardRoutes =
require("./routes/dashboardRoutes");

const userRoutes =
require("./routes/userRoutes");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

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
"/api/dashboard",
dashboardRoutes
);

app.use(
"/api/users",
userRoutes
);

app.get("/",(req,res)=>{
    res.send(
        "Digital Library API Running"
    );
});

app.use(errorHandler);

const PORT =
process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(
        `Server Running On Port ${PORT}`
    );
});