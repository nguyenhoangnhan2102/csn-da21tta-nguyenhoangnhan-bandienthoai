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

//config json api
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/confirm-order', (req, res) => {
    const { hoTenKhachHang, sodienthoai, diachi, quantity, totalPrice } = req.body;

    // Thực hiện xử lý với dữ liệu đã nhận được từ frontend
    // Ví dụ: Lưu vào cơ sở dữ liệu, gửi email xác nhận, vv.

    // Trả về kết quả cho frontend (ở đây là một ví dụ)
    res.json({
        success: true,
        message: 'Đơn hàng đã được xác nhận thành công!',
        data: {
            hoTenKhachHang,
            sodienthoai,
            diachi,
            quantity,
            totalPrice,
        },
    });
});

//configViewEngine
configViewEngine(app);
app.use(cors());

//used router
app.use('/', webRoutes);
app.use("/api/v1/", apiRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${hostname}:${port}`);
});