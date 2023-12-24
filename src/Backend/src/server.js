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

//config json api
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Xử lý POST request từ React
app.post('/confirmOrder', (req, res) => {
    const { hoTenKhachHang, sodienthoai, diachi, quantity, totalPrice } = req.body;
    console.log(hoTenKhachHang, sodienthoai, diachi, quantity, totalPrice);
    // const query = `
    //   INSERT INTO orders (hoTenKhachHang, sodienthoai, diachi, quantity, totalPrice)
    //   VALUES (?, ?, ?, ?, ?)
    // `;

    if (err) {
        console.error('Error inserting into MySQL:', err);
        res.status(500).json({ success: false, error: err.message });
    } else {
        console.log('Order confirmed and saved to database');
        res.status(200).json({ success: true });
    }

    // connection.query(query, [hoTenKhachHang, sodienthoai, diachi, quantity, totalPrice], (err, result) => {
    //     if (err) {
    //         console.error('Error inserting into MySQL:', err);
    //         res.status(500).json({ success: false, error: err.message });
    //     } else {
    //         console.log('Order confirmed and saved to database');
    //         res.status(200).json({ success: true });
    //     }
    // });
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