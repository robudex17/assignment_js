const Product = require ('../models/product')
const mongodb = require('mongodb');


exports.getAddProduct = (req,res,next) =>{
    res.render('admin/add-edit-product',{
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editingMode : false,
        product: null,
        
    });
};

exports.getEditProduct = (req,res,next) =>{
    let productId = req.params.productId;
    let editingMode = req.query.edit;
    Product.findById(productId).then(product => {
        res.render('admin/add-edit-product',{
            pageTitle: 'Edit Product',
            path: '/admin/add-edit-product',
            editingMode : editingMode,
            product: product,
           
        });   
    });
}

exports.getProducts = (req,res, next) => {
       Product.find().then(products => {
        res.render('admin/products',{
            pageTitle : "Admin Products",
            path: `/admin/products`,
            prods : products
        });
       })    
};

exports.getProduct = (req, res,next) => {
    res.render('admin/edit-product', {
        pageTitle: "Edit Product",
        path : '/admin/editProduct',
        userpath: `/${req.user.user}/products`,
        userlogin: req.user.user
    });
}
exports.postAddEditProduct = (req,res, next) => {
   
    const  productId = req.body.productId;
    const title = req.body.title;
     const price = req.body.price;
     const imageUrl = req.body.imageUrl;
     const description = req.body.description;
     const proudctObject = {title:title,price:price,imageUrl:imageUrl,description:description,userId:req.user}
     const product = new Product(proudctObject) 
     if(productId == null) {
     return product.save().then( () => {
        res.redirect('/')
     })
        
     }else{
  
        Product.findById(productId).then(product => {
            product.title = title;
            product.price = price;
            product.imageUrl = imageUrl;
            product.description = description;
            product.save().then(
               res.redirect('/')
           )
        })
     }

         
};


   exports.deleteProduct = (req,res, next) => {
        let productId = req.body.productId;
        Product.deleteOne({_id: new mongodb.ObjectId(productId)}).then(
            res.redirect('/')
        )
        .catch(err => console.log(err))     
};