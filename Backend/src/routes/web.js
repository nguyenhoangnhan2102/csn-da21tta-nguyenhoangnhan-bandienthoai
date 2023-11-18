const express = require('express');
const router = express.Router();
const { getHomePage, getABC, getNHNhan } = require('../controllers/homeController');

//router.Method('/route', handler)
router.get('/', getHomePage);

router.get('/abc', getABC);

router.get('/nhnhan', getNHNhan);

module.exports = router;