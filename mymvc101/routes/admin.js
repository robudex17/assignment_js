const express = require('express');
const productController = require('../controllers/products');
const router = express.Router();


router.get('/add-product',productController.getAddproduct);

router.post('/add-product',productController.postProduct);

module.exports = router;