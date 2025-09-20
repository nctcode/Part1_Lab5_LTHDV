const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: String,
    phone: String,
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" }
});

module.exports = mongoose.model("Product", ProductSchema);