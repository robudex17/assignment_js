
// exports.getProducts = (req,res, next)=>{
//     res.render('shop/index',{
//         path: '/shop/index',
//         prods: products,
//         pageTitle: "Shop"
//     });
// }

const Product = require('../models/product');

exports.getAddProduct = (req,res,next) =>{
    res.render('add-product',{
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
};

exports.postProduct = (req,res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) =>{
        console.log(products);
        res.render('shop',{
            pageTitle : "Product list",
            prods : products,
            path : '/'
        });
    });
};