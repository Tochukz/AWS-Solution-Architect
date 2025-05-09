var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var categoryRouter = require("./routes/category");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// URI rewrite middleware
app.use((req, res, next) => {
  const url = req.url.toLowerCase();
  if (url == "/product-service") {
    req.url = "/";
  } else if (url.startsWith("/product-service")) {
    req.url = req.url.replace("/product-service", "");
  }
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter); // For the index page
app.use("/categories", categoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.locals.path = req.path;

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
