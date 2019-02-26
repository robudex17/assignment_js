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
    const user = req.user
    user.getCart().then(cart => {
        return cart.getProducts()
    }).then(products => {
        res.render('shop/cart', {
            pageTitle : "Your Cart",
            path : "/cart",
            userlogin: req.user.user,
            userpath: null,
            prods: products
        });
    
    })
    
    .catch(err => console.log(err))
} 

exports.postCart = (req, res, next) => {
   const productId = req.body.productId;
   const user = req.user; 
   let qty = 1;
   let fetchCart ;
   console.log(productId)
   user.getCart()
   .then(cart => {
       fetchCart = cart;
      return cart.getProducts({where :{id: productId}})
   })
   .then(products => {
        let product = products[0];
        if (products.length === 0){
           return Product.findByPk(productId).then(product => {
            return fetchCart.addProduct(product, {through : {quantity : qty}})
             })
            
        }
        else{
            let newquantiy = product.cartItem.quantity + 1
            return fetchCart.addProduct(product,{through: {quantity: newquantiy}})
        }    
        
    }).then( () => {
        res.redirect('/cart')
    })
       
   .catch(err => console.log(err));
}

exports.deleteFromCart = (req, res, next) => {
     const productId = req.body.productId;
     const user = req.user;
     user.getCart()
     .then(cart => {
         return cart.getProducts({where: {id : productId}})
     }).then(products => {
         return products[0].cartItem.destroy()

     }).then(() => {
         res.redirect('/cart')
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