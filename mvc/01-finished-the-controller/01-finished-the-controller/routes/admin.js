const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');
const usersConrtroller = require('../controllers/users');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);
router.get('/add-username', usersConrtroller.addUsername);

router.post('/add-username',usersConrtroller.listUsername);

module.exports = router;





