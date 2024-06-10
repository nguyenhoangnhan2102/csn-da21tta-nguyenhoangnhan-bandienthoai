const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var appRoot = require('app-root-path');

const {
    getAllProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    deleteNSX,
    getIdProduct,
    //user
    //getAllUser,
    getInfoUser,
    CapnhatUser,
    updateUser,

    Signup,

    confirmOrder,

    handleLogin,

    updateIMG,

    getIdBill,
} = require("../controllers/apiController");

//Ensure the directory exists
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'img'));
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    },
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp)$/)) {
        req.fileValidationError = "Only image files are allowed!";
        return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

router.get("/product", getAllProduct);
router.post("/create-product", createProduct);
router.put("/update-product", updateProduct);
router.delete("/delete-product/:id", deleteProduct);
router.delete("/delete-tenNSX/:tenNSX", deleteNSX);
router.get("/product/:id", getIdProduct);

//User
//router.get("/user", getAllUser);
router.get("/user/info/:username", getInfoUser);
router.put("/user/info/update/:username", updateUser);

router.post('/confirmOrder', confirmOrder);
router.post('/confirmSignup', Signup);
router.post('/login', handleLogin);
router.put('/updateimg', upload.single('avatar'), updateIMG);

router.get("/bill/:username", getIdBill);


module.exports = router;
