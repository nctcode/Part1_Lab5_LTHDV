const Product = require("../models/product");
const Supplier = require("../models/supplier");

// ========== UI Controllers ==========
exports.indexUI = async(req, res) => {
    try {
        const products = await Product.find().populate("supplierId");
        // If API, respond with JSON
        if (req.originalUrl.startsWith("/api/")) {
            return res.json(products);
        }
        res.render("products/index", { products });
    } catch (err) {
        if (req.originalUrl.startsWith("/api/")) {
            return res.status(500).json({ error: err.message });
        }
        res.status(500).send(err.message);
    }
};

exports.newForm = async(req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.render("products/new", { suppliers });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.editForm = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const suppliers = await Supplier.find();
        if (req.originalUrl.startsWith("/api/")) {
            if (!product) return res.status(404).json({ error: "Product not found" });
            return res.json(product);
        }
        res.render("products/edit", { product, suppliers });
    } catch (err) {
        if (req.originalUrl.startsWith("/api/")) {
            return res.status(500).json({ error: err.message });
        }
        res.status(500).send(err.message);
    }
};

// ========== API Controllers ==========
exports.getAll = async(req, res) => {
    try {
        const products = await Product.find().populate("supplierId");
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOne = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("supplierId");
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async(req, res) => {
    try {
        const product = await Product.create(req.body);
        if (req.originalUrl.startsWith("/api/")) {
            return res.status(201).json(product);
        }
        res.redirect("/products");
    } catch (err) {
        if (req.originalUrl.startsWith("/api/")) {
            return res.status(400).json({ error: err.message });
        }
        const suppliers = await Supplier.find();
        res.render("products/new", { suppliers, error: err.message });
    }
};

exports.update = async(req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (req.originalUrl.startsWith("/api/")) {
            return res.json(product);
        }
        res.redirect("/products");
    } catch (err) {
        if (req.originalUrl.startsWith("/api/")) {
            return res.status(400).json({ error: err.message });
        }
        const suppliers = await Supplier.find();
        const product = await Product.findById(req.params.id);
        res.render("products/edit", { product, suppliers, error: err.message });
    }
};

exports.delete = async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        if (req.originalUrl.startsWith("/api/")) {
            return res.json({ message: "Product deleted successfully" });
        }
        res.redirect("/products");
    } catch (err) {
        if (req.originalUrl.startsWith("/api/")) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect("/products");
    }
};