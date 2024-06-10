const express = require("express");
const connection = require("../config/dataBase");
const fs = require("fs");
const moment = require('moment');
//hien thi data thong qua api
const {
    getUser
} = require('../controllers/homeController');
const { use } = require("../routes/api");

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
    console.log("id", id);
    try {
        const [results, fields] = await connection.execute(
            "SELECT * FROM SANPHAM WHERE id = ?", [id]
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

// const getAllUser = async (req, res) => {
//     const results = await getUser();
//     return res.status(200).json({
//         EM: results.EM,
//         EC: results.EC,
//         DT: results.DT,
//     });
// };

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
            console.log("res =", respon1)
            return {
                EM: 'tìm thấy user !!!',
                EC: "1",
                DT: respon1[0],
            };
        } else {
            return {
                EM: 'user này không tồn tại',
                EC: "0",
                DT: [],
            };
        }

    } catch (error) {
        console.error("Error in postLoginUser:", error);
        throw error;
    }

};

//-----------------------------ĐẶT HÀNG---------------------------------//
// Hàm kiểm tra sự tồn tại của mã khách hàng trong cơ sở dữ liệu
const isMaKHExists = async (maKH) => {
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM KHACHHANG WHERE maKH = ?', [maKH]);
    return rows[0].count > 0;
};

const isMaHDExists = async (maHD) => {
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM HOADON WHERE maHD = ?', [maHD]);
    return rows[0].count > 0;
};

// Hàm tạo số ngẫu nhiên không trùng lặp
const random = async () => {
    let maKH;
    try {
        do {
            maKH = Math.floor(Math.random() * 1000) + 1;
        } while (await isMaKHExists(maKH));
        console.log(maKH);
        return maKH;
    } catch (error) {
        console.error('Error generating random MaKH:', error);
        throw error;
    }
};

const randomhoadon = async () => {
    let maHD;
    try {
        do {
            maHD = Math.floor(Math.random() * 1000) + 1;
        } while (await isMaHDExists(maHD));
        console.log(maHD);
        return maHD;
    } catch (error) {
        console.error('Error generating random MaHD:', error);
        throw error;
    }
};

const hoadon = async (maKH, hoTenKhachHang, sodienthoai, diachi, id, quantity, totalPrice) => {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(currentTime);
    try {
        const maHD = await randomhoadon();
        console.log("maHD=", maHD);
        await connection.execute(`
                INSERT INTO HOADON (maHD, maKH, tenKH, diachiKH, sdtKH, thoigiandat)
                VALUES (?, ?, ?, ?, ?, ?)
                `, [maHD, maKH, hoTenKhachHang, diachi, sodienthoai, currentTime]);
        await chitiethoadon(maHD, id, quantity, totalPrice);

        console.log('Hóa đơn');
    } catch (error) {
        console.error('Error inserting into HOADON:', error);
        throw error;
    }
};

const chitiethoadon = async (maHD, id, quantity, totalPrice) => {
    try {
        await connection.execute(`
                INSERT INTO CHITIETHOADON (maHD, id, soluongdat, tongtien)
                VALUES (?, ?, ?, ?)
                `, [maHD, id, quantity, totalPrice]);
        subtractProductQuantity(id, quantity);
        console.log('số lượng', quantity);
        console.log('tổng tiền', totalPrice);
    } catch (error) {
        console.error('Error inserting into CHITIETHOADON:', error);
        throw error;
    }
};

///-------------------------------------------------------------------------------------------------------

async function subtractProductQuantity(id, quantity) {
    // Tạo kết nối đến cơ sở dữ liệu

    try {
        // Lấy số lượng sản phẩm trước khi trừ
        const [rows] = await connection.execute('SELECT soluong FROM SANPHAM WHERE id = ?', [id]);

        if (rows.length > 0) {
            const currentQuantity = rows[0].soluong;

            // Kiểm tra xem có đủ số lượng sản phẩm để trừ không
            if (currentQuantity >= quantity) {
                // Thực hiện trừ số lượng sản phẩm
                await connection.execute('UPDATE SANPHAM SET soluong = ? WHERE id = ?', [currentQuantity - quantity, id]);
                console.log('Cập nhật thành công.');
            } else {
                console.log('Không đủ số lượng sản phẩm');
            }
        } else {
            console.log('Không tìm thấy.');
        }
    } catch (error) {
        console.error('Lỗi: ' + error.message);
    }
}

//------------------------------------------------------------------------------------------------------//

const confirmOrder = async (req, res) => {
    try {
        const maKH = await random();
        const { id, hoTenKhachHang, sodienthoai, diachi, quantity, totalPrice, getusername } = req.body;
        console.log("user", getusername)

        // Thực hiện truy vấn INSERT

        await connection.execute(`
        INSERT INTO KHACHHANG (maKH, hotenKH, sdt, diachi, taikhoan)
        VALUES (?, ?, ?, ?, ?)
        `, [maKH, hoTenKhachHang, sodienthoai, diachi, getusername]);

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
        const { hotenKH, sdt, diachi } = req.body;

        const results = await CapnhatUser(username, hotenKH, sdt, diachi);
        return res.status(200).json({
            EM: results.EM,
            EC: results.EC,
            DT: results.DT,
        });
    } catch (error) {
        console.log(error);
    }
};

const CapnhatUser = async (username, hotenKH, sdt, diachi) => {
    try {
        const [results, fields] = await connection.execute(
            "SELECT * from KHACHHANG WHERE taikhoan = ?",
            [username]
        );
        console.log("check resultls", results);
        if (results.length > 0) {
            const [results2, fields] = await connection.execute(
                "UPDATE KHACHHANG SET hotenKH = ?, sdt = ?, diachi = ? where taikhoan = ?",
                [hotenKH, sdt, diachi, username]
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

const updateIMG = async (req, res) => {
    try {
        const { username } = req.body; // Ensure the username is sent in the request body
        const avatar = req.file ? req.file.filename : null;
        console.log(avatar);

        if (!avatar) {
            return res.status(400).json({ EC: 0, message: 'No image uploaded' });
        }

        const [results2, fields] = await connection.execute(
            `UPDATE KHACHHANG SET avatar = ? WHERE taikhoan = ?`,
            [avatar, username]
        );
        if (results2.length > 0) {
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
    } catch (error) {
        console.error("Error in postLoginUser:", error);
        throw error;
    }
}

const getIdBill = async (req, res) => {
    try {
        const username = req.params.username;
        console.log("username=", username);

        // Kiểm tra nếu username không tồn tại hoặc không hợp lệ
        if (!username) {
            return res.status(400).json({
                EM: 'Username is required',
                EC: 0,
                DT: null,
            });
        }

        // Phản hồi thành công với thông tin username
        return res.status(200).json({
            EM: 'Oke',
            EC: 1,
            DT: username,
        });
    } catch (error) {
        // In lỗi ra console
        console.error("Error: ", error);

        // Phản hồi lỗi server
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: -1,
            DT: null,
        });
    }
}


module.exports = {
    getAllProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    deleteNSX,
    getIdProduct,
    getTenLoaiSP,
    //User
    //getAllUser,
    getInfoUser,
    CapnhatUser,
    Signup,
    confirmOrder,
    handleLogin,
    updateUser,
    updateIMG,
    getIdBill
};
