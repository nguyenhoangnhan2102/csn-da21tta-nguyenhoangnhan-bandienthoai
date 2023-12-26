const express = require('express');
const path = require('path');
require('dotenv').config();
const configViewEngine = require('./config/viewEngine.js');
const webRoutes = require('./routes/web.js');
const apiRoute = require("./routes/api.js");
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
const cors = require('cors');
app.use("/public", express.static(path.join(__dirname, "public")));
const bodyParser = require('body-parser');
const connection = require('./config/dataBase.js');
const moment = require('moment');
app.use(cors());

//config json api
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

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

const hoadon = async (maKH, diachi, id, quantity, totalPrice) => {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(currentTime);
    try {
        const maHD = await randomhoadon();
        await connection.execute(`
                INSERT INTO HOADON (maHD, maKH, diachigiaohang, thoigiandat)
                VALUES (?, ?, ?, ?)
                `, [maHD, maKH, diachi, currentTime]);

        await chitiethoadon(maHD, id, quantity, totalPrice);

        console.log('Order confirmed and saved to database');
    } catch (error) {
        console.error('Error inserting into HOADON:', error);
        throw error;
    }
};

const chitiethoadon = async (maHD, id, quantity, totalPrice) => {
    try {
        await connection.execute(`
                INSERT INTO CHITIETHOADON (maHD, id, soluongSP, tongtien)
                VALUES (?, ?, ?, ?)
                `, [maHD, id, quantity, totalPrice]);

        console.log('Order confirmed and saved to database');
    } catch (error) {
        console.error('Error inserting into CHITIETHOADON:', error);
        throw error;
    }
};

// Xử lý POST request từ React
app.post('/confirmOrder', async (req, res) => {
    try {
        const maKH = await random();
        const { id, hoTenKhachHang, sodienthoai, diachi, quantity, totalPrice } = req.body;

        // Thực hiện truy vấn INSERT
        await connection.execute(`
            INSERT INTO KHACHHANG (maKH, hotenKH, sdt, diachi)
            VALUES (?, ?, ?, ?)
            `, [maKH, hoTenKhachHang, sodienthoai, diachi]);

        console.log('Order confirmed and saved to database');

        await hoadon(maKH, diachi, id, quantity, totalPrice);

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error inserting into MySQL:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});





//configViewEngine
configViewEngine(app);


//used router
app.use('/', webRoutes);
app.use("/api/v1/", apiRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${hostname}:${port}`);
});