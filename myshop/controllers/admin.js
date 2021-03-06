const Product = require('../models/product');

exports.getAddProduct = (req,res,next) =>{
    console.log(req.query);
    res.render('admin/add-edit-product',{
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editingMode : false,
        product: null
    });
};

exports.getEditProduct = (req,res,next) =>{
    let productId = req.params.productId;
    let editingMode = req.query.edit;

    Product.fetchSingle(productId, (product) => {
        res.render('admin/add-edit-product',{
            pageTitle: 'Edit Product',
            path: '/admin/add-edit-product',
            editingMode : editingMode,
            product: product
        });
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
exports.getProduct = (req, res,next) => {
    res.render('admin/edit-product', {
        pageTitle: "Edit Product",
        path : '/admin/editProduct'
    });
}
exports.postProduct = (req,res, next) => {
    let productId;
    if (req.body.productId) {
        productId = req.body.productId;
    }else {
        productId = null;
    }
    const title = req.body.title;
    const price = req.body.price;
    const imageurl = req.body.imageurl;
    const description = req.body.description;
    
    const product = new Product(productId,title,price,imageurl,description);
    product.save();
    res.redirect('/');
};

exports.deleteProduct = (req,res,next) => {
    let productId = req.body.productId;
   Product.deleteProduct(productId);
   res.redirect('/');
   console.log(req.params.productId);
}