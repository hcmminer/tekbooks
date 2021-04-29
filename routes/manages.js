var express = require("express");
var router = express.Router();
var BookModel = require("../models/bookModel");
var CategoryModel = require("../models/categoryModel");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("manages/index");
});
router.get("/books", function (req, res, next) {
	BookModel.find({}, (err, docs) => {
		res.render("manages/books/index", {
			books: docs,
		});
	});
});
router.post("/books", function (req, res, next) {
	const title = req.body.title && req.body.title.trim();
	const author = req.body.author && req.body.author.trim();
	const description = req.body.description && req.body.description.trim();
	const category = req.body.category && req.body.category.trim();
	const price = req.body.price && req.body.price.trim();
	const pushlisher = req.body.pushlisher && req.body.pushlisher.trim();
	const cover = req.body.cover && req.body.cover.trim();

	if (title == "" || price == "") {
		req.flash("alert", "Please fill out required fields");
		res.redirect("/manages/books/add");
	} else if (isNaN(price)) {
		req.flash("alert", "Price must be a number");
		res.redirect("/manages/books/add");
	} else {
		const newBook = new BookModel({
			title: title,
			author: author,
			description: description,
			price: price,
			pushlisher: pushlisher,
			cover: cover,
			category: category,
		});

		newBook.save(function (err) {
			if (err) return handleError(err);
			req.flash("success", "Book Added");
			res.redirect("/manages/books");
		});
	}
});
router.get("/books/add", function (req, res, next) {
	CategoryModel.find({}, (err, docs) => {
		res.render("manages/books/add", {
			categories: docs,
		});
	});
});
router.get("/books/edit/:id", function (req, res, next) {
	CategoryModel.find({}, (err, categories) => {
		BookModel.findOne({ _id: req.params.id }, (err, book) => {
			res.render("manages/books/edit", {
				categories: categories,
				book: book,
			});
		});
	});
});
router.post("/books/edit/:id", function (req, res, next) {
	const title = req.body.title && req.body.title.trim();
	const author = req.body.author && req.body.author.trim();
	const description = req.body.description && req.body.description.trim();
	const category = req.body.category && req.body.category.trim();
	const price = req.body.price && req.body.price.trim();
	const pushlisher = req.body.pushlisher && req.body.pushlisher.trim();
	const cover = req.body.cover && req.body.cover.trim();

	BookModel.updateOne(
		{ _id: req.params.id },
		{
			title: title,
			author: author,
			description: description,
			price: price,
			pushlisher: pushlisher,
			cover: cover,
			category: category,
		},
		function (err) {
			if (err) return handleError(err);
			req.flash("success", "Book Updated");
			res.redirect("/manages/books");
		}
	);
});
router.get("/categories", function (req, res, next) {
	res.render("manages/categories/index");
});

module.exports = router;
