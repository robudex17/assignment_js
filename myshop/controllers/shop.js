const Product = require('../models/product');
const Cart = require ('../models/cart');
//const CartItem = require('../models/cart-item')

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products =>{
        res.render('shop/product-list',{
            pageTitle : "Product list",
            prods : products,
            path : '/products',
            userlogin: req.user.user,
            userpath: null
        });
    }); 
};

exports.getProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).then(product => {
        res.render('shop/product-details', {
            pageTitle: "Prodcut details",
            path : `/${req.user.user}/products`,
            userpath: `/${req.user.user}/products`,
            product : product,
            userlogin: req.user.user
    });
    });
};


exports.getIndex = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/index',{
            pageTitle : "Product list",
            prods : products,
            path : '/',
            userlogin: req.user.user,
            userpath: null
        });
    }).catch(err => {
        console.log(err);
    });
};


exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout', {
        pageTitle: "Checkout",
        path : '/checkout',
        userlogin: req.user.user
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle : "Your Cart",
        path : "/cart",
        userlogin: req.user.user,
        userpath: null
    });
};

exports.postCart = (req, res, next) => {
    let fetchCart;
    let productId = req.body.productId;
    let newquantity = 1;
    req.user.getCart()
    .then(cart => {
        fetchCart = cart;
        return cart.getProducts({where: {id: productId}})
    }).then(products => {
        let product;
        if(products.length > 0) {
            product = products[0]
        }
        if(product){
            const currentquantity = product.cartItem.quantity;
            newquantity =   newquantity + currentquantity ;
            return product;
        }
        return Product.findByPk(productId)
        
    }).then(product => {
        console.log(newquantity)
        return fetchCart.addProduct(product, {through :{ quantity: newquantity}})
    }).then(() => {
       return fetchCart.getProducts()
    } ).then(products => {
        console.log(products[0].cartItem.quantity)
    })
    .catch(err => console.log(err))
}
exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle : "Your Orders",
        path : '/orders',
        userlogin: req.user.user
    });
}