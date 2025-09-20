const Supplier = require("../models/supplier");

// ========== UI Controllers ==========
exports.indexUI = async(req, res) => {
    try {
        const suppliers = await Supplier.find();
        // If API, respond with JSON
        if (req.originalUrl.startsWith("/api/")) {
            return res.json(suppliers);
        }
        res.render("suppliers/index", { suppliers });
    } catch (err) {
        if (req.originalUrl.startsWith("/api/")) {
            return res.status(500).json({ error: err.message });
        }
        res.status(500).send(err.message);
    }
};

exports.newForm = (req, res) => {
    res.render("suppliers/new");
};

exports.editForm = async(req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (req.originalUrl.startsWith("/api/")) {
            if (!supplier) return res.status(404).json({ error: "Supplier not found" });
            return res.json(supplier);
        }
        res.render("suppliers/edit", { supplier });
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
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOne = async(req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) return res.status(404).json({ error: "Supplier not found" });
        res.json(supplier);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async(req, res) => {
    try {
        const supplier = await Supplier.create(req.body);
        if (req.originalUrl.startsWith("/api/")) {
            return res.status(201).json(supplier);
        }
        res.redirect("/suppliers");
    } catch (err) {
        if (req.originalUrl.startsWith("/api/")) {
            return res.status(400).json({ error: err.message });
        }
        res.render("suppliers/new", { error: err.message });
    }
};

exports.update = async(req, res) => {
    try {
        const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (req.originalUrl.startsWith("/api/")) {
            return res.json(supplier);
        }
        res.redirect("/suppliers");
    } catch (err) {
        if (req.originalUrl.startsWith("/api/")) {
            return res.status(400).json({ error: err.message });
        }
        const supplier = await Supplier.findById(req.params.id);
        res.render("suppliers/edit", { supplier, error: err.message });
    }
};

exports.delete = async(req, res) => {
    try {
        await Supplier.findByIdAndDelete(req.params.id);
        if (req.originalUrl.startsWith("/api/")) {
            return res.json({ message: "Supplier deleted successfully" });
        }
        res.redirect("/suppliers");
    } catch (err) {
        if (req.originalUrl.startsWith("/api/")) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect("/suppliers");
    }
};