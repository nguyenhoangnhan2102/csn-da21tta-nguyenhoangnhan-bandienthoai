
const express = require("express");
const router = express.Router();

const {
    getAllProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    deleteNSX
} = require("../controllers/apiController");

//const { deleteNSX } = require("../controllers/homeController");

router.get("/product", getAllProduct);
router.post("/create-product", createProduct);
router.put("/update-product", updateProduct);
router.delete("/delete-product/:id", deleteProduct);
router.delete("/delete-tenNSX/:tenNSX", deleteNSX);

module.exports = router;