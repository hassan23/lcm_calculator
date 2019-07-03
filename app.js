require("dotenv").config();
var createError = require("http-errors");
var http = require("http");
var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var config = require("./config");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
const server = http.Server(app);
mongoose.connect(config.db.url, { useNewUrlParser: true });
// view engine setup
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page

  res.status(err.status || 500);
  res.json({ message: err.message, error: err });
});

server.listen(config.port, () =>
  console.log(`Server listening on PORT: ${config.port}`)
);
