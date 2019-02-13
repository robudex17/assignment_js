const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');


router.get('/product-list', shopController.getProducts);


 router.get('/product', shopController.getProduct);

 router.get('/cart',shopController.getCart);

 router.get('/orders', shopController.getOrders);

 router.get('/checkout',shopController.getCheckout);

 router.get('/', shopController.getIndex);

module.exports = router;