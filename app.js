var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var flash = require("connect-flash");
var session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var booksRouter = require("./routes/books");
var managesRouter = require("./routes/manages");
var pagesRouter = require("./routes/pages");
var cartRouter = require("./routes/cart");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tekbooks", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// START connect-flash
// setup Express Session and flash to use connect-flash
app.use(
	session({
		secret: "secret",
		saveUninitialized: false,
		resave: false,
		cookie: { httpOnly: true },
	})
);
app.use(flash());
app.use((req, res, next) => {
	res.locals.messages = req.flash();
	next();
});

// END connect-flash
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/books", booksRouter);
app.use("/manages", managesRouter);
app.use("/pages", pagesRouter);
app.use("/cart", cartRouter);

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

const port = 3000;
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
