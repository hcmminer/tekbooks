const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
	title: String, // String is shorthand for {type: String}
	description: String,
	category: String,
	author: String,
	pushlisher: String,
	cover: String,
	price: Number,
});

// shorten Text . Note: arrow function not working with this 
bookSchema.methods.truncText = function (length) {
	return this.description.substring(0, length);
};

const BookModel = mongoose.model("book", bookSchema);

module.exports = BookModel;
