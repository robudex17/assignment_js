
const Product = require('../model/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  }

exports.postProduct =  (req, res, next) => {
   // Product.products.push({ title: req.body.title });
   const products = new Product(req.body.title);
    products.save();
    res.redirect('/');
  }

exports.getProducts =  (req, res, next) => {
     Product.fetchall((products) => {
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
          });
    });

  }

  exports.testmodel = (req,res,next) => {
        const p = new Product.product('This is new title');
        p.save();
  }