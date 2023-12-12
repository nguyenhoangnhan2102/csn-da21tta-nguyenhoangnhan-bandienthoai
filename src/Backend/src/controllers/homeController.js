const express = require("express");
const connection = require("../config/dataBase");  // Đường dẫn có thể phải được điều chỉnh dựa trên cấu trúc của dự án của bạn
const multer = require("multer");

const getAllProduct = async (req, res) => {
    const [results, fields] = await connection.execute("SELECT * FROM SANPHAM");
    return results;
};

const getHomePage = async (req, res) => {
    //let [results, fields] = await (await connection).execute('select * from SANPHAM ')
    let results = await getAllProduct();
    const getAllNSXX = await getAllNSX();
    return res.render("home.ejs", { dataProduct: results, AllNSX: getAllNSXX });
};

// const getDetailPage = async (req, res) => {
//     let userid = req.params.id;
//     let [user, fields] = await connection.query(
//         "SELECT * FROM SANPHAM where id = 1"
//     );
//     console.log("check user", user);
//     return res.send(JSON.stringify(user));
// };

const getUserPage = async (req, res) => {
    const [results, fields] = await connection.execute("SELECT * FROM KHACHHANG ");

    return res.render("user.ejs", { dataUsers: results });
};

const createNewProduct = async (req, res) => {
    let id = req.body.id;
    let tenSP = req.body.tenSP;
    let tenloaiSP = req.body.tenloaiSP;
    let dungluong = req.body.dungluong;
    let soluong = req.body.soluong;
    let giatien = req.body.giatien;
    let motachitiet = req.body.motachitiet;
    let tenNSX = req.body.tenNSX;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }

    try {
        await connection.execute(
            "insert into SANPHAM(id, tenSP, soluong, dungluong, tenloaiSP, tenNSX, giatien, motachitiet, mota) values (?,?,?,?,?,?,?,?,?)",
            [id, tenSP, soluong, dungluong, tenloaiSP, tenNSX, giatien, motachitiet, req.file.filename]
        );

        return res.redirect("/");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.body.productId;
    await connection.execute("delete from SANPHAM where id = ?", [productId]);
    return res.redirect("/");
};

const getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await connection.execute(
        "SELECT * FROM SANPHAM where id = ?",
        [id]
    );
    const [results, fields] = await connection.execute(
        "SELECT * FROM SANPHAM"
    );

    return res.render("edit.ejs", { dataProduct: user[0], dataproduct: results });
};

const updateProduct = async (req, res, err) => {
    let id = req.body.id;
    let tenSP = req.body.tenSP;
    let tenloaiSP = req.body.tenloaiSP;
    let dungluong = req.body.dungluong;
    let soluong = req.body.soluong;
    let giatien = req.body.giatien;
    let motachitiet = req.body.motachitiet;
    let tenNSX = req.body.tenNSX;
    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }
    try {
        await connection.execute(
            "UPDATE SANPHAM SET tenSP = ?, dungluong =?, soluong = ?, tenloaiSP = ?, tenNSX = ?, giatien = ?, motachitiet = ?, mota = ? WHERE id = ?",
            [tenSP, dungluong, soluong, tenloaiSP, tenNSX, giatien, motachitiet, req.file.filename, id]
        );

        return res.redirect("/");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const upload = multer().single("product_pic");
const getAllNSX = async () => {

    let [results, fields] = await (await connection).execute('select * from NHASANXUAT ')
    return results;
}
const addNewNSX = async (req, res) => {
    let NSX = req.body.tenNSX

    const getAllNSXX = await getAllNSX()

    res.render("addnew.ejs", { AllNSX: getAllNSXX });
};

const getAddNew = async (req, res) => {
    let tenNSX = req.body.tenNSX;
    const [results, fields] = await (await connection).execute(`INSERT INTO NHASANXUAT (tenNSX) VALUES (?);`, [tenNSX]);
    const getAllNSXX = await getAllNSX()
    //res.render('addnew.ejs', { AllNSX: getAllNSXX });
    //const getAllSP = await getAllProduct()
    //res.render("home.ejs", { dataProduct: getAllSP, AllNSX: getAllNSXX });
    res.render("addnew.ejs", { AllNSX: getAllNSXX });
};

const deleteNSX = async (req, res) => {
    const NSXId = req.body.NSXId;
    await connection.execute("delete from NHASANXUAT where tenNSX = ?", [NSXId]);
    const getAllNSXX = await getAllNSX();
    return res.render("addnew.ejs", { AllNSX: getAllNSXX });
};

module.exports = {
    getHomePage,
    //getDetailPage,
    createNewProduct,
    deleteProduct,
    getEditPage,
    updateProduct,
    getUserPage,
    addNewNSX,
    getAddNew,
    deleteNSX
};
