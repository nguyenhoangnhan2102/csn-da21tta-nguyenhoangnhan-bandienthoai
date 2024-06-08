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

//app.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

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


//configViewEngine
configViewEngine(app);


//used router
app.use('/', webRoutes);
app.use("/api/v1/", apiRoute);

app.listen(port, () => {
    console.log(`Example app listening on port http://${hostname}:${port}`);
});