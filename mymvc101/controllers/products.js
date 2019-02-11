exports.getAddproduct = (req,res,next) =>{
    res.render('add-product',{pageTitle:"Add-Product"});
};

exports.postProduct = (req,res,next) => {
    console.log(req.body);
    
};