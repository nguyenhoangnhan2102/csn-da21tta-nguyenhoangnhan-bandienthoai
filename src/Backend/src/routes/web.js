const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// var appRootPath = require('app-root-path');

const {
    getHomePage
} = require('../controllers/homeController');

router.get('/', getHomePage);

module.exports = router;