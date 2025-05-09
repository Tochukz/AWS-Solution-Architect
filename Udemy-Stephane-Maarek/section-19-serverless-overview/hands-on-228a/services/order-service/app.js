const path = require("path");
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");

const orderRouter = require("./routes/orders");
const indexRouter = require("./routes/index");

const app = express();

// URI rewrite
app.use((req, res, next) => {
  const originalUrl = req.originalUrl;
  if (originalUrl === "/order-service") {
    req.url = "/";
  } else if (originalUrl.startsWith("/order-service/")) {
    const newPath = originalUrl.replace("/order-service", "");
    req.url = newPath;
  }

  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/orders", orderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
