const Product = require('../models/product');

exports.getAddProduct = (req,res,next) =>{
    res.render('admin/add-edit-product',{
        pageTitle: 'Add Product',
        path: `/${req.user.user}/add-product`,
        userpath: `/${req.user.user}/products`,
        editingMode : false,
        product: null,
        userlogin: req.user.user
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
        userlogin: req.user.user,
        userpath: `/${req.user.user}/products`
    });    
});
}

exports.getProducts = (req,res, next) => {
    if(req.user.id ===1){ //if admin
        Product.findAll().then(products => {
             res.render('admin/products',{
                pageTitle : "Admin Products",
                userpath: `/${req.user.user}/products`,
                path: `/${req.user.user}/products`,
                userlogin: req.user.user,
                prods : products
            });
        });
    
    }else {
        req.user.getProducts()  //getproducts is created by the assocation or user and product model
      .then(products => {
        res.render('admin/products',{
            pageTitle : "Admin Products",
            userpath: `/${req.user.user}/products`,
            path: `/${req.user.user}/products`,
            prods : products,
            userlogin: req.user.user
        });
    })
    .catch(err => console.log(err))
    }
 
    
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
    
     const title = req.body.title;
     const price = req.body.price;
     const imageurl = req.body.imageurl;
     const description = req.body.description;
    
    let productId;
    if (req.body.productId) {
        productId = req.body.productId;
        Product.upsert({id:productId,title: title,price: price, imageurl:imageurl, description: description})
        .then(() =>{
            console.log('Data is updated');
            res.redirect(`/${req.user.user}/products`);
        }
            
        ).catch(err => console.log(err));
    }else {
        req.user.createProduct(   //createProduct is special function create after the creation of user and product assocation
            {id:productId,title: title,price: price, imageurl:imageurl, description: description}
        ).then(()=> {
            console.log('Data is saved');
            res.redirect(`/${req.user.user}/products`);
        })
        .catch(err => console.log(err));
       
        //can use also create method to insert element to the table
        //eg Product.create({title: title})
    }
         
};


   exports.deleteProduct = (req,res, next) => {
        let productId = req.body.productId;
        console.log(req.params.productId);
        Product.destroy({where: {
            id: productId
        }}).then(() => {
            console.log('Record is now deleted')
            res.redirect('/');
        }).catch(err => {
            console.log(err)
        });
};