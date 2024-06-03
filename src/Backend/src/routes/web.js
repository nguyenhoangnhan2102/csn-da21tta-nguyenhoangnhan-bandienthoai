const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
var appRoot = require('app-root-path');

const {
    getHomePage,
    //getDetailPage,
    createNewProduct,
    deleteProduct,
    getEditPage,
    updateProduct,
    getUserPage,
    addNewNSX,
    getAddNew,
    deleteNSX,
    searchProduct,
    deleteUser,
    getDetailBill,
    //deleteDetailBill,
} = require('../controllers/homeController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "../public/img");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
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

router.get("/", getHomePage);
router.get("/detail/product/");
router.post(
    "/create-new-product",
    upload.single("profile_pic"),
    createNewProduct
);

router.post("/delete-product", deleteProduct);
router.get("/editproduct/:id", getEditPage);
router.post("/update-product", upload.single("profile_pic"), updateProduct);

router.get("/user-order", getUserPage);

//Thêm loại sản phẩm
router.get("/tao-moi-NSX", addNewNSX);
router.post("/add-new-NSX", getAddNew);

router.post("/Tim", searchProduct);

router.post("/delete-tenNSX", deleteNSX);

router.post("/delete-user", deleteUser);

router.get("/bill-order", getDetailBill);



module.exports = router;