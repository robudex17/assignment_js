const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');


router.get('/:userlogin/add-product', adminController.getAddProduct);

router.get('/:userlogin/products', adminController.getProducts);
router.get('/products/:productId',adminController.getEditProduct);
router.post('/:userlogin/add-product', adminController.postAddEditProduct);

router.post('/delete-product', adminController.deleteProduct);

module.exports = router;