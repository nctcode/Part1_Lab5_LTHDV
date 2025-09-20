const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");

router.get("/", supplierController.index);
router.get("/new", supplierController.newForm);
router.post("/new", supplierController.create);
router.get("/edit/:id", supplierController.editForm);
router.post("/edit/:id", supplierController.update);
router.post("/delete/:id", supplierController.delete);

module.exports = router;