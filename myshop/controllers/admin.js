const Product = require ('../models/product')

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
       Product.findAll().then(products => {
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
     
     const product = new Product(title,price,imageUrl,description) 
     if(productId == null) {
        product.save()
        
     }else{
         product.update(productId)
     }
     
     res.redirect('/')
    
         
};


   exports.deleteProduct = (req,res, next) => {
        let productId = req.body.productId;
        Product.deleteById(productId).then(
            res.redirect('/')
        )
        .catch(err => console.log(err))     
};