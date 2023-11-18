const express = require('express');
const { getHompage, getCreatePage, postCreateUser,
    getUpdatePage, postUpdateUser,
    postDeleteUser, postHandleRemoveUser
} = require('../controllers/homeController');
const router = express.Router();

// router.Method('/routes', handler)
router.get('/', getHompage);

router.get('/create', getCreatePage);

router.get('/update/:id', getUpdatePage);

router.post('/create-user', postCreateUser);

router.post('/update-user', postUpdateUser);

router.post('/delete-user/:id', postDeleteUser);

router.post('/delete-user', postHandleRemoveUser);

module.exports = router; //export default