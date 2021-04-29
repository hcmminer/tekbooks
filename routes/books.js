var express = require("express");
var router = express.Router();
var BookModel = require("../models/bookModel");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.get("/details/:id", function (req, res, next) {
	BookModel.findById(req.params.id, (err, docs) => {
		res.render("books/details", { book: docs });
	});
});

module.exports = router;
