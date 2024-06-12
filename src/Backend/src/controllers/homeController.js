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

const getUser = async (req, res) => {
    const [results, fields] = await connection.execute("SELECT * FROM KHACHHANG ");
    console.log(results);
    return {
        EM: "xem thông tin thành công",
        EC: 1,
        DT: results,
    };
};

// JOIN
// KHACHHANG ON HOADON.maKH = KHACHHANG.maKH

const getDetailBill = async (req, res) => {
    try {
        const [results, fields] = await connection.execute(`
            SELECT
                HOADON.maHD,
                KHACHHANG.maKH,
                SANPHAM.tenSP,
                KHACHHANG.hotenKH,
                KHACHHANG.sdt,  
                KHACHHANG.diachi,
                HOADON.tenKH,
                HOADON.diachiKH,
                HOADON.sdtKH,
                CHITIETHOADON.soluongdat,
                CHITIETHOADON.tongtien,
                HOADON.thoigiandat
            FROM
                HOADON
            JOIN
                KHACHHANG ON HOADON.maKH = KHACHHANG.maKH
            JOIN
                CHITIETHOADON ON HOADON.maHD = CHITIETHOADON.maHD
            JOIN
                SANPHAM ON CHITIETHOADON.id = SANPHAM.id
        `);

        return res.render("detailbill.ejs", { dataBills: results });
    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).send("Internal Server Error");
    }
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
    let manhinh = req.body.manhinh;
    let pin = req.body.pin;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }

    try {
        await connection.execute(
            "insert into SANPHAM(tenSP, soluong, dungluong, ram, tenloaiSP, tenNSX, giatien, manhinh, pin, ghichu, mota) values (?,?,?,?,?,?,?,?,?,?,?)",
            [tenSP, soluong, dungluong, ram, tenloaiSP, tenNSX, giatien, manhinh, pin, ghichu, req.file.filename]
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

const deleteUser = async (req, res) => {
    const maKH = req.body.idUser;

    try {
        // Xóa tất cả chi tiết hóa đơn của các hóa đơn liên quan
        await connection.execute("DELETE FROM CHITIETHOADON WHERE maHD IN (SELECT maHD FROM HOADON WHERE maKH = ?)", [maKH]);

        // Sau đó xóa các hóa đơn của khách hàng
        await connection.execute("DELETE FROM HOADON WHERE maKH = ?", [maKH]);

        // Cuối cùng, xóa khách hàng
        await connection.execute("DELETE FROM KHACHHANG WHERE maKH = ?", [maKH]);

        res.redirect("/user-order");
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi Nội Server");
    }
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
    let manhinh = req.body.manhinh;
    let pin = req.body.pin;
    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }
    try {
        await connection.execute(
            "UPDATE SANPHAM SET tenSP = ?, dungluong =?, ram = ?, soluong = ?, tenloaiSP = ?, tenNSX = ?, giatien = ?, manhinh = ?, pin = ?, ghichu = ?, mota = ? WHERE id = ?",
            [tenSP, dungluong, ram, soluong, tenloaiSP, tenNSX, giatien, manhinh, pin, ghichu, req.file.filename, id]
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

const searchProduct = async (req, res) => {
    try {
        const search = req.body.tenSP || ''; // Lấy giá trị tìm kiếm từ form
        const tenNSXFilter = req.body.tenNSX || ''; // Lấy giá trị lọc từ dropdown
        const tenloaiSPFilter = req.body.tenloaiSP || '';
        const giaFilter = req.body.giatien || ''; // Lấy giá trị lọc từ form

        let query = "SELECT * FROM SANPHAM WHERE 1"; // 1 để bắt đầu chuỗi truy vấn

        if (search) {
            query += " AND tenSP LIKE ?";
        }

        if (tenNSXFilter) {
            query += " AND tenNSX = ?";
        }

        if (tenloaiSPFilter) {
            query += " AND tenloaiSP = ?";
        }
        if (giaFilter) {
            // Xử lý trường chọn giá tương ứng với các khoảng giá
            if (giaFilter === "5000000") {
                query += " AND giatien < 5000000";
            } else if (giaFilter === "10000000") {
                query += " AND giatien >= 10000000 AND giatien <= 15000000";
            } else if (giaFilter === "15000000") {
                query += " AND giatien >= 15000000 AND giatien <= 20000000";
                // Thêm các trường hợp khác tùy theo nhu cầu
            } else if (giaFilter === "20000000") {
                query += " AND giatien > 20000000";
                // Thêm các trường hợp khác tùy theo nhu cầu
            }
        }

        const queryParams = [];

        if (search) {
            queryParams.push('%' + search + '%');
        }

        if (tenNSXFilter) {
            queryParams.push(tenNSXFilter);
        }

        if (tenloaiSPFilter) {
            queryParams.push(tenloaiSPFilter);
        }

        // if (giaFilter) {
        //     queryParams.push(giaFilter);
        // }

        const [results, fields] = await connection.execute(
            query,
            queryParams
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
    getUser,
    addNewNSX,
    getAddNew,
    deleteNSX,
    searchProduct,
    deleteUser,
    getDetailBill,
    //deleteDetailBill
};
