const Product = require('../models/product');
const User = require('../models/user')

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products =>{
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
    Product.findAll().then(products => {
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
 return req.user.getCart().then(cartItems => {
    console.log(cartItems)
     res.render('shop/cart', {
        pageTitle : "Your Cart",
        path : "/cart",
        userpath: null,
        prods: cartItems 
    })
  })
} 

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    return req.user.postCart(productId).then(result => {
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
        res.redirect('/orders')
    })
}
exports.getOrders = (req, res, next) => {
    req.user.getOrders().then(orders => {
        res.render('shop/orders', {
            pageTitle : "Your Orders",
            path : '/orders',
            orders: orders
        });
    })
    
}












// let qty = 1;
// let fetchCart ;
// console.log(productId)
// user.getCart()
// .then(cart => {
//     fetchCart = cart;
//    return cart.getProducts({where :{id: productId}})
// })
// .then(products => {
//      let product = products[0];
//      if (products.length === 0){
//         return Product.findByPk(productId).then(product => {
//          return fetchCart.addProduct(product, {through : {quantity : qty}})
//           })
         
//      }
//      else{
//          let newquantiy = product.cartItem.quantity + 1
//          return fetchCart.addProduct(product,{through: {quantity: newquantiy}})
//      }    
     
//  }).then( () => {
//      res.redirect('/cart')
//  })
    
// .catch(err => console.log(err));