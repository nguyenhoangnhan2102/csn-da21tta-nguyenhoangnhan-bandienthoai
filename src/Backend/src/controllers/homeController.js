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


const getUserPage = async (req, res) => {
    const [results, fields] = await connection.execute("SELECT * FROM KHACHHANG ");

    return res.render("user.ejs", { dataUsers: results });
};

const createNewProduct = async (req, res) => {
    //let id = req.body.id;
    let tenSP = req.body.tenSP;
    let tenloaiSP = req.body.tenloaiSP;
    let dungluong = req.body.dungluong;
    let ram = req.body.ram;
    let soluong = req.body.soluong;
    let giatien = req.body.giatien;
    let ghichu = req.body.ghichu;
    let tenNSX = req.body.tenNSX;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }

    try {
        await connection.execute(
            "insert into SANPHAM(tenSP, soluong, dungluong, ram, tenloaiSP, tenNSX, giatien, ghichu, mota) values (?,?,?,?,?,?,?,?,?)",
            [tenSP, soluong, dungluong, ram, tenloaiSP, tenNSX, giatien, ghichu, req.file.filename]
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
    let ram = req.body.ram;
    let soluong = req.body.soluong;
    let giatien = req.body.giatien;
    let ghichu = req.body.ghichu;
    let tenNSX = req.body.tenNSX;
    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }
    try {
        await connection.execute(
            "UPDATE SANPHAM SET tenSP = ?, dungluong =?, ram = ?, soluong = ?, tenloaiSP = ?, tenNSX = ?, giatien = ?, ghichu = ?, mota = ? WHERE id = ?",
            [tenSP, dungluong, ram, soluong, tenloaiSP, tenNSX, giatien, ghichu, req.file.filename, id]
        );

        return res.redirect("/");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const upload = multer().single("profile_pic");

const getAllNSX = async () => {

    let [results, fields] = await (await connection).execute('select * from NHASANXUAT ')
    return results;
}
const addNewNSX = async (req, res) => {
    let NSX = req.body.tenNSX;

    const getAllNSXX = await getAllNSX()

    res.render("newNSX.ejs", { AllNSX: getAllNSXX });
};

const getAddNew = async (req, res) => {
    let tenNSX = req.body.tenNSX;
    const [results, fields] = await (await connection).execute(`INSERT INTO NHASANXUAT (tenNSX) VALUES (?);`, [tenNSX]);
    const getAllNSXX = await getAllNSX()
    //res.render('addnew.ejs', { AllNSX: getAllNSXX });
    //const getAllSP = await getAllProduct()
    //res.render("home.ejs", { dataProduct: getAllSP, AllNSX: getAllNSXX });
    res.render("newNSX.ejs", { AllNSX: getAllNSXX });
};

const deleteNSX = async (req, res) => {
    const NSXId = req.body.NSXId;
    await connection.execute("delete from NHASANXUAT where tenNSX = ?", [NSXId]);
    const getAllNSXX = await getAllNSX();
    return res.render("newNSX.ejs", { AllNSX: getAllNSXX });
};

const updateUser = async (req, res) => {
    try {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Kiểm tra dữ liệu đầu vào
        const { hotenKH, sdt, diachi, soluong, id, tenSP } = req.body;
        if (!hotenKH || !sdt || !diachi || !soluong || !id) {
            throw new Error("Bạn chưa truyền đủ thông tin không thể đặt hàng !!!!");
        }

        // Lấy thời gian hiện tại
        const currentTime = new Date();
        const formattedTime = currentTime
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

        // Tạo các số ngẫu nhiên
        const randomIntegerInRange = getRandomInt(0, 60000);
        const randomIntegerHoadon = getRandomInt(0, 60000);

        // Insert thông tin khách hàng
        await connection.execute(
            "INSERT INTO KHACHHANG(maKH, hotenKH, sdt, diachi) VALUES (?, ?, ?, ?)",
            [randomIntegerInRange, hotenKH, sdt, diachi]
        );

        // Insert thông tin hóa đơn
        await connection.execute(
            "INSERT INTO HOADON(maHD, maKH, diachigiaohang, thoigiandat) VALUES (?, ?, ?, ?)",
            [randomIntegerHoadon, randomIntegerInRange, diachi, formattedTime]
        );

        // Insert thông tin chi tiết hóa đơn
        await connection.execute(
            "INSERT INTO CHITIETHOADON(maHD, id, soluongSP) VALUES (?, ?, ?)",
            [randomIntegerHoadon, id, soluong]
        );

        await connection.execute(
            " UPDATE SANPHAM SET soluong = soluong - ? WHERE id = ?",
            [soluong, id]
        );

        // Chuyển hướng về trang chủ sau khi đặt hàng thành công
        const successMessage = "Bạn đã đặt hàng thành công!";

        return res.send("cảm ơn bạn đã đặt hàng");
    } catch (error) {
        console.error("An error occurred:", error);
        return res.status(500).send(error.message || "Đã có lỗi xảy ra");
    }
};

const searchProduct = async (req, res) => {
    try {
        const searchKeyword = req.body.tenSP;
        const tenNSXFilter = req.body.tenNSX || ''; // Lấy giá trị lọc từ dropdown
        const tenloaiSPFilter = req.body.tenloaiSP || '';

        let query = "SELECT * FROM SANPHAM WHERE tenSP LIKE ?";

        if (tenNSXFilter) {
            query += " AND tenNSX = ?";
        }

        if (tenloaiSPFilter) {
            query += " AND tenloaiSP = ?";
        }

        const [results, fields] = await connection.execute(
            query,
            ['%' + searchKeyword + '%', tenNSXFilter, tenloaiSPFilter]
        );

        // Render trang chứa kết quả tìm kiếm và lọc
        return res.render("search.ejs", { dataProduct: results });
    } catch (error) {
        console.error("An error occurred:", error);
        return res.status(500).send(error.message || "Đã có lỗi xảy ra");
    }
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
    deleteNSX,
    searchProduct,
    updateUser
};
