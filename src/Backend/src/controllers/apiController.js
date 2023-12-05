const express = require("express");
const connection = require("../config/dataBase");
const fs = require("fs");
//hien thi data thong qua api

const getAllProduct = async (req, res) => {
    try {
        const [results, fields] = await connection.execute(
            "SELECT * FROM SANPHAM"
        );

        // Thêm đường dẫn đầy đủ cho mỗi sản phẩm
        const productsWithImageUrls = results.map((product) => {
            return {
                ...product,
                imageUrl: `http://localhost:8080/api/v1/img/${product.mota}`,
            };
        });

        return res.status(200).json({
            message: "ok",
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

//them data thong qua api
const createProduct = async (req, res) => {
    let id = req.body.id;
    let tenSP = req.body.tenSP;
    let tenloaiSP = req.body.loaisp;
    let soluong = req.body.soluong;
    let giatien = req.body.giatien;
    let tenNSX = req.body.tenNSX;
    if (!id || !tenSP || !tenloaiSP || !soluong || !giatien || !tenNSX) {
        return res.status(200).json({
            message: "missing ",
        });
    }
    await connection.execute(
        "insert into SANPHAM(id, tenSP, tenloaiSP, tenNSX, soluong, giatien) values (?,?,?,?,?,?)",
        [id, tenSP, tenloaiSP, tenNSX, soluong, giatien]
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
    let soluong = req.body.soluong;
    let giatien = req.body.giatien;
    let tenNSX = req.body.tenNSX;
    if (!id || !tenSP || !tenloaiSP || !soluong || !giatien || !tenNSX) {
        return res.status(200).json({
            message: "missing ",
        });
    }
    await connection.execute(
        "update SANPHAM set tenSP = ?, tenloaiSP = ?, tenNSX = ?, soluong = ?, giatien = ? where id = ?",
        [tenSP, tenloaiSP, tenNSX, soluong, giatien, id]
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

module.exports = {
    getAllProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    deleteNSX
};
