const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) =>{
        console.log(products);
        console.log(products.length)
        res.render('shop/product-list',{
            pageTitle : "Product list",
            prods : products,
            path : '/product-list'
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) =>{
        console.log(products);
        console.log(products.length)
        res.render('shop/index',{
            pageTitle : "Product list",
            prods : products,
            path : '/'
        });
    });
};

exports.getProduct = (req, res, next) => {
    res.render('shop/product-details', {
        pageTitle: "Prodcut details",
        path : "/product"

    });
};

exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout', {
        pageTitle: "Checkout",
        path : '/checkout'
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle : "Your Cart",
        path : "/cart"
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle : "Your Orders",
        path : '/orders',
    });
}