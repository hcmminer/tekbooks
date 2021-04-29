const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
	name: String,
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
