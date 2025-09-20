const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.index);
router.get("/new", productController.newForm);
router.post("/new", productController.create);
router.get("/edit/:id", productController.editForm);
router.post("/edit/:id", productController.update);
router.post("/delete/:id", productController.delete);

module.exports = router;