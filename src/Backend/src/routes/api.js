
const express = require("express");
const router = express.Router();

const {
    getAllProduct,
    createProduct,
    deleteProduct,
    updateProduct
} = require("../controllers/apiController");

router.get("/product", getAllProduct);
router.post("/create-product", createProduct);
router.put("/update-product", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

module.exports = router;