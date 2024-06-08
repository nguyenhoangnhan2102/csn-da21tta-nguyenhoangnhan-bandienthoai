const express = require("express");
const connection = require("../config/dataBase");
const fs = require("fs");
//hien thi data thong qua api
const {
    getUser
} = require('../controllers/homeController');

const getAllProduct = async (req, res) => {
    try {
        const [results, fields] = await connection.execute(
            "SELECT * FROM SANPHAM"
        );

        //Thêm đường dẫn đầy đủ cho mỗi sản phẩm
        const productsWithImageUrls = results.map((product) => {
            return {
                ...product,
                imageUrl: `http://localhost:8080/api/v1/img/${product.mota}`,
            };
        });

        return res.status(200).json({
            //message: "ok",
            data: productsWithImageUrls,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Internal server error!!!",
            error: error.message,
        });
    }
};

const getIdProduct = async (req, res) => {
    let id = req.params.id;
    try {
        const [results, fields] = await connection.execute(
            "SELECT * FROM SANPHAM WHERE id = ?", [id]
        );

        //Thêm đường dẫn đầy đủ cho mỗi sản phẩm
        const profilesWithImageUrls = results.map((profile) => {
            return {
                ...profile,
                imageUrl: `http://localhost:8080/api/v1/img/${profile.avatar}`,
            };
        });

        return res.status(200).json({
            //message: "ok",
            data: profilesWithImageUrls,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Internal server error!!!",
            error: error.message,
        });
    }
}

//them data thong qua api
const createProduct = async (req, res) => {
    let id = req.body.id;
    let tenSP = req.body.tenSP;
    let tenloaiSP = req.body.loaisp;
    let soluong = req.body.soluong;
    let dungluong = req.body.dungluong;
    let ram = req.body.ram;
    let manhinh = req.body.manhinh;
    let pin = req.body.pin;
    let giatien = req.body.giatien;
    let ghichu = req.body.ghichu;
    let tenNSX = req.body.tenNSX;
    if (!id || !tenSP || !tenloaiSP || !soluong || !dungluong || !ram || !giatien || !manhinh || !pin || !tenNSX) {
        return res.status(200).json({
            message: "missing ",
        });
    }
    await connection.execute(
        "insert into SANPHAM(id, tenSP, tenloaiSP, tenNSX, soluong, dungluong, ram, giatien, ghichu) values (?,?,?,?,?,?,?,?,?)",
        [id, tenSP, tenloaiSP, tenNSX, soluong, giatien, dungluong, ram, ghichu]
    );
    return res.status(200).json({
        message: "ok",
    });
};

//Xóa dữ liệu
const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    if (!productId) {
        return res.status(200).json({
            message: "missing ",
        });
    }
    await connection.execute("delete from SANPHAM where id = ?", [productId]);
    return res.status(200).json({
        message: "ok",
    });
};

const updateProduct = async (req, res) => {
    let id = req.body.id;
    let tenSP = req.body.tenSP;
    let tenloaiSP = req.body.tenloaiSP;
    let dungluong = req.body.dungluong;
    let ram = req.body.ram;
    let soluong = req.body.soluong;
    let giatien = req.body.giatien;
    let manhinh = req.body.manhinh;
    let pin = req.body.pin;
    let ghichu = req.body.ghichu;
    let tenNSX = req.body.tenNSX;
    if (!id || !tenSP || !tenloaiSP || !soluong || !dungluong || !ram || !giatien || !manhinh || !pin || !tenNSX) {
        return res.status(200).json({
            message: "missing ",
        });
    }
    await connection.execute(
        "update SANPHAM set tenSP = ?, tenloaiSP = ?, tenNSX = ?, dungluong = ?, soluong = ?, giatien = ?, ghichu = ? where id = ?",
        [tenSP, tenloaiSP, tenNSX, dungluong, soluong, giatien, ghichu, id]
    );
    return res.status(200).json({
        message: "ok",
    });
};

const deleteNSX = async (req, res) => {
    const NSXId = req.params.tenNSX;
    if (!NSXId) {
        return res.status(200).json({
            message: "missing ",
        });
    }
    await connection.execute("delete from NHASANXUAT where tenNSX = ?", [NSXId]);
    return res.status(200).json({
        message: "ok",
    });
};

const getTenLoaiSP = async (req, res) => {
    let tenloaiSP = req.params.tenloaiSP;
    try {
        const [results, fields] = await connection.execute(
            "SELECT * FROM SANPHAM WHERE tenloaiSP = ?", [tenloaiSP]
        );

        //Thêm đường dẫn đầy đủ cho mỗi sản phẩm
        const productsWithImageUrls = results.map((product) => {
            return {
                ...product,
                imageUrl: `http://localhost:8080/api/v1/img/${product.mota}`,
            };
        });

        return res.status(200).json({
            //message: "ok",
            data: productsWithImageUrls,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Internal server error!!!",
            error: error.message,
        });
    }
}

const getAllUser = async (req, res) => {
    const results = await getUser();
    return res.status(200).json({
        EM: results.EM,
        EC: results.EC,
        DT: results.DT,
    });
};

const getInfoUser = async (req, res) => {
    try {
        const taikhoan = req.params.username;

        const results = await getThongtinUser(taikhoan);
        return res.status(200).json({
            EM: results.EM,
            EC: results.EC,
            DT: results.DT,
        });

    } catch (error) {
        console.log(error);
    }
};

const getThongtinUser = async (taikhoan) => {

    try {

        const respon = await connection.execute(`
        SELECT * FROM TAIKHOAN where taikhoan = ?`, [taikhoan])
        console.log(respon[[0]])

        if (respon.length > 0) {
            const respon1 = await connection.execute(`
            SELECT * FROM KHACHHANG where taikhoan = ?`, [taikhoan]);


            console.log("respone1 = ", respon1[0]);
            return {
                EM: 'Oke',
                EC: "1",
                DT: respon1[[0]],
            };
        } else {
            return {
                EM: 'Oke',
                EC: "1",
                DT: [],
            };
        }

    } catch (error) {
        console.log(error);
    }
    const productsWithImageUrls = results.map((product) => {
        return {
            ...product,
            imageUrl: `http://localhost:8080/api/v1/img/${product.avatar}`,
        };
    });

    return res.status(200).json({
        //message: "ok",
        data: productsWithImageUrls,
    });
};



const confirmOrder = async () => {
    try {
        const maKH = await random();
        const { id, hoTenKhachHang, sodienthoai, diachi, quantity, totalPrice } = req.body;

        // Thực hiện truy vấn INSERT

        await connection.execute(`
        INSERT INTO KHACHHANG (maKH, hotenKH, sdt, diachi)
        VALUES (?, ?, ?, ?)
        `, [maKH, hoTenKhachHang, sodienthoai, diachi,]);

        console.log('Khách hàng');

        await hoadon(maKH, hoTenKhachHang, sodienthoai, diachi, id, quantity, totalPrice);

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error inserting into MySQL:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}


const Signup = async (req, res) => {
    try {

        const { username, password } = req.body;


        //const hashedPassword = await bcrypt.hash(password, 20);

        // Thực hiện truy vấn INSERT
        await connection.execute(`
            INSERT INTO TAIKHOAN (taikhoan, matkhau)
            VALUES (?, ?)
            `, [username, password]);

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error inserting into MySQL:', error);
        res.status(500).json({ success: false, error: error.message });
    }

};

const handleLogin = async (req, res) => {
    const { username, password } = req.body;

    console.log(username + password);
    try {



        if (!username || !password) {
            return res.status(400).send({ message: 'Please provide both username and password' });
        }

        const respone = await connection.execute(`
            SELECT * FROM TAIKHOAN WHERE taikhoan = ? AND matkhau = ?
            `, [username, password]);


        console.log(respone);
        if (respone.length > 0) {
            //res.status({ message: 'Login successful', user: respone[0] });
            res.status(200).send({ message: 'Login successful', user: respone[0] });
        } else {
            res.status(401).send({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error inserting into MySQL:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const username = req.params.username;
        const { hotenKH, sdt, diachi, avatar } = req.body;

        const results = await CapnhatUser(username, hotenKH, sdt, diachi, avatar);
        return res.status(200).json({
            EM: results.EM,
            EC: results.EC,
            DT: results.DT,
        });
    } catch (error) {
        console.log(error);
    }
};

const CapnhatUser = async (username, hotenKH, sdt, diachi, avatar) => {
    try {
        const [results, fields] = await connection.execute(
            "SELECT * from KHACHHANG WHERE taikhoan = ?",
            [taikhoan]
        );
        console.log("check resultls", results);
        if (results.length > 0) {
            const [results2, fields] = await connection.execute(
                "UPDATE KHACHHANG SET hotenKH = ?, sdt = ?, diachi = ? avatar = ? where taikhoan = ?",
                [hotenKH, sdt, avatar, diachi, username]
            );
            return {
                EM: "thay đổi thông tin thành công",
                EC: 1,
                DT: results2,
            };
        } else {
            return {
                EM: "Tài khoản không tồn tại",
                EC: 0,
                DT: [],
            };
        }
        console.log(results);
    } catch (error) {
        console.error("Error in postLoginUser:", error);
        throw error;
    }
};

module.exports = {
    getAllProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    deleteNSX,
    getIdProduct,
    getTenLoaiSP,
    //User
    getAllUser,
    getInfoUser,
    CapnhatUser,
    Signup,
    confirmOrder,
    handleLogin,
    updateUser,
};
