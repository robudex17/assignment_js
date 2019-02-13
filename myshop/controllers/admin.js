const Product = require('../models/product');

exports.getAddProduct = (req,res,next) =>{
    res.render('admin/add-product',{
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
};

exports.getProducts = (req,res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products',{
        pageTitle : "Admin Products",
        path : '/admin/products',
        prods : products
    });
   

    });
}
exports.postProduct = (req,res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imageurl = req.body.imageurl;
    const description = req.body.description;

    const product = new Product(title,price,imageurl,description);
    product.save();
    res.redirect('/');
};