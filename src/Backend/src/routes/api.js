
const express = require("express");
const router = express.Router();

const {
    getAllProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    deleteNSX,
    getIdProduct,
    //user
    getAllUser,
    getInfoUser,
    CapnhatUser,

    Signup,
} = require("../controllers/apiController");

//const { deleteNSX } = require("../controllers/homeController");

router.get("/product", getAllProduct);
router.post("/create-product", createProduct);
router.put("/update-product", updateProduct);
router.delete("/delete-product/:id", deleteProduct);
router.delete("/delete-tenNSX/:tenNSX", deleteNSX);
router.get("/product/:id", getIdProduct);

//User
router.get("/user", getAllUser); // get list of users
router.get("/user/info/:username", getInfoUser); //get info 1 user
router.put("/user/info/update/:username", CapnhatUser);
// router.put("/user/info/update/password/:username", CapnhatPasswordUser); //update 1 user (cho người dùng)
// router.delete("/user/info/delete/:username", XoaUser); //xóa user (cho admin)

router.post('/confirmSignup', Signup);

module.exports = router;