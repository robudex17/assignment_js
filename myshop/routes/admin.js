const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');


router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);
router.get('/products/:productId',adminController.getEditProduct);
router.post('/add-product', adminController.postEditProduct);

router.post('/delete-product', adminController.deleteProduct);

module.exports = router;