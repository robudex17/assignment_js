const Product = require('../models/product');
const User = require('../models/user')
const mongodb = require('mongodb')

exports.getProducts = (req, res, next) => {
    Product.find().then(products =>{
        res.render('shop/product-list',{
            pageTitle : "Product list",
            prods : products,
            path : '/products'
        });
    }); 
};

exports.getProduct = (req, res, next) => {
     const id = req.params.productId;
    // console.log(id)
    Product.findById(id).then(product => {
        res.render('shop/product-details', {
            pageTitle: "Prodcut details",
            path : '/products',
            product : product
            
        });
    });
  
}

exports.getIndex = (req, res, next) => {
    
    Product.find().populate('userId').then(products => {
        res.render('shop/index',{
            pageTitle : "Product list",
            prods : products,
            path : '/'
        })
    })
    .catch(err => console.log(err))
}

exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout', {
        pageTitle: "Checkout",
        path : '/checkout',
      
    });
};

exports.getCart = (req, res, next) => {
// req.user.getCart(cartItems => {
//     res.render('shop/cart', {
//                 pageTitle : "Your Cart",
//                 path : "/cart",
//                 userpath: null,
//                 prods: cartItems 
//      })
// }) 
req.user.getCart().then(cartItems => {
    console.log(cartItems[0].cart.items)
     res.render('shop/cart', {
        pageTitle : "Your Cart",
        path : "/cart",
        userpath: null,
        prods: cartItems[0] 
    })
  })
} 

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    let user = req.user;
    user.postCart(productId).then(result => {
        res.redirect('/cart')
    })
   
     
  }

exports.deleteFromCart = (req, res, next) => {
     const productId = req.body.productId;
     const user = req.user;
    return req.user.deleteFromCart(productId).then(result => {
         console.log(result)
        res.redirect('/cart')
     })
     
}  
exports.createOrder = (req,res,next) => {
    return req.user.createOrder().then(result => {
        res.redirect('/')
    })
}
exports.getOrders = (req, res, next) => {
    req.user.getOrders().then(orders => {
        console.log(orders.length)
        res.render('shop/orders', {
            pageTitle : "Your Orders",
            path : '/orders',
            orders: orders
        });
    })
    //req.user.getOrders()
}

