var express = require("express");
var router = express.Router();
var BookModel = require("../models/bookModel");

/* GET home page. */
router.get("/", function (req, res, next) {
	BookModel.find({}, (err, docs) => {
		docs.forEach((book) => {
			book.truncText = book.truncText(50);
		});
		res.render("index", { books: docs });
	});
});

module.exports = router;
