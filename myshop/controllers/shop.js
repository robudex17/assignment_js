const Product = require('../models/product');
const Cart = require ('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) =>{
        console.log(products.length)
        res.render('shop/product-list',{
            pageTitle : "Product list",
            prods : products,
            path : '/products'
        });
    });
};

exports.getProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.fetchSingle(id, (product) => {
        res.render('shop/product-details', {
            pageTitle: "Prodcut details",
            path : "/products",
            product : product
    });
    

    });
};


exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) =>{
        res.render('shop/index',{
            pageTitle : "Product list",
            prods : products,
            path : '/'
        });
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

exports.postCart = (req, res, next) => {
    let productId = req.body.productId;
    Product.fetchSingle(productId, (product) => {
        Cart.addToCart(product);
        res.redirect('/');
   });

}
exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle : "Your Orders",
        path : '/orders',
    });
}