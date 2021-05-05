var express = require("express");
var router = express.Router();
var BookModel = require("../models/bookModel");
var CategoryModel = require("../models/categoryModel");

/* GET home page. */
router.get("/", function (req, res, next) {
	let cart = req.session.cart; // cart la object
	console.log(req.session, "req.session");
	let displayCart = { items: [], total: 0 };
	let total = 0;

	for (const item in cart) {
		// item la cac key trong object
		console.log(cart[item], "cart item");
		displayCart.items.push(cart[item]); // them vao mang items cac object
		total += cart[item].qty * cart[item].price; // khi them object vao mang thi them tien vao tong tien
	}

	displayCart.total = total;

	res.render("carts/index", {
		cart: displayCart,
	});
});

router.post("/:id", (req, res) => {
	req.session.cart = req.session.cart || {}; // khong cho cart bi undifined
	const cart = req.session.cart;

	BookModel.findOne({ _id: req.params.id }, (err, book) => {
		if (err) {
			console.log("error");
		}
		if (cart[req.params.id]) {// kiem tra xem san pham da duoc them lan dau tien chua
			cart[req.params.id].qty++;// neu them san pham them lan nua thi so luong tang len 1
		} else {
			cart[req.params.id] = {// neu san pham chua duoc them lan nao thi tao moi object
				item: book._id,
				title: book.title,
				price: book.price,
				qty: 1,
			};
		}
		res.redirect("/cart");
	});
});
module.exports = router;
