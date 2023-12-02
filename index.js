const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const { run } = require("./db/mongodbConnection");
const usersRouter = require("./router/users");
const AuthRouter = require("./router/authentication");
const propertiesRouter = require("./router/properties");
const wishlistsRouter = require("./router/wishlists");
const cookieParser = require("cookie-parser");
const offersRouter = require("./router/offers");
const reviewsRouter = require("./router/reviews");

const port = process.env.PORT || 1212;

//middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser())

app.use(usersRouter)

app.use(propertiesRouter)

app.use(AuthRouter)

app.use(wishlistsRouter)

app.use(offersRouter)

app.use(reviewsRouter)

app.get("/", (req, res) => {
  res.send("Elite Estate server is running...:)");
});


app.all("*", (req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on the server`);
  error.status = 404;
  next(error);
});


app.use(require("./middlewares/globalErrorHandler"))

const main = async () => {
  await run().catch(console.dir);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
  });
};

main()
