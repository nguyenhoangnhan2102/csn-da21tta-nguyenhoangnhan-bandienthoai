const express = require("express");
const connection = require("../config/dataBase");
//const multer = require("multer");
const getHomePage = async (req, res) => {
    // const [results, fields] = await connection.execute(
    //     "SELECT * FROM SANPHAM "
    // );
    res.render("home.ejs");
};

module.exports = {
    getHomePage
};