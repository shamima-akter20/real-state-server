const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const publicRouter  = require('./router/public')
const adminRouter  = require('./router/admin')
const port = process.env.PORT || 1212;

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const { run } = require("./db/mongodbConnection");
const userRouter = require("./router/user");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

app.use('/', publicRouter)

app.use('/admin', adminRouter)

app.use('/user', userRouter)


app.get("/", (req, res) => {
  res.send("Elite Estate server is running...:)");
});


app.all("*", (req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on the server`);
  error.status = 404;
  next(error);
});


app.use(globalErrorHandler)

const main = async () => {
  await run().catch(console.dir);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
  });
};

main()
