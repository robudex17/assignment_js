const path = require('path');
const fs =  require('fs');

const p = path.join(__dirname, '..', 'data',  'cart.json');

module.exports = class Cart {

    // static addToCart(product) {
    //     const productToCart = {};
    //     let productsInCart = [];
    //     if(fs.existsSync(p)){
    //         console.log(p);
    //         fs.readFile(p ,(err,data) =>{
    //             productsInCart = JSON.parse(data);
    //            console.log(typeof(productsInCart));
               
    //             let getIndex = productsInCart.findIndex((p) => p.id === product.id);
            
    //             if (getIndex !== -1) { //if index of element is found
    //                 productsInCart[getIndex].id = product.id;
    //                 productsInCart[getIndex].title = product.title;
    //                 productsInCart[getIndex].total_price = +productsInCart[getIndex].total_price + +product.price;
    //                 productsInCart[getIndex].quantity = productsInCart[getIndex].quantity + 1;
                    
    //             }else {
    //                 productToCart.id = product.id;
    //                 productToCart.title = product.title;
    //                 productToCart.total_price = product.price;
    //                 productToCart.quantity = 1;
    //                 productsInCart.push(productToCart)
    //             }
              
    //             fs.writeFile(p,JSON.stringify(productsInCart),(err)=> {
    //                 if(err){
    //                     console.log(err);
    //                 }else {
    //                     console.log('Product Added Cart');
    //                 }
    //             });
    //         });
    //     }else {
    //         productToCart.id = product.id;
    //         productToCart.title = product.title;
    //         productToCart.total_price = product.price;
    //         productToCart.quantity = 1;
    //         productsInCart.push(productToCart);

    //         fs.writeFile(p, JSON.stringify(productsInCart),(err) => {
    //             if(err){
    //                 console.log(err);
    //             }else{
    //                 console.log("New Prodcut Added to cart");
    //             }
    //         });
    //     } 
    // }
    static addToCart(product) {
        let productsInCart = { products : [], totalPrice: 0}
        fs.readFile(p,(err, data) => {
            if (err) {
                let productToCart = {id: product.id, quantity:1 };
                productsInCart.products.push(productToCart);
                productsInCart.totalPrice = +product.price;
                fs.writeFile(p, JSON.stringify(productsInCart), (err) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Product added to cart");
                    }
                });    
            }else {
                productsInCart = JSON.parse(data);
                let getIndex = productsInCart.products.findIndex((p) => p.id === product.id);
                if(getIndex !== -1){
                    productsInCart.products[getIndex].id = product.id;
                    productsInCart.products[getIndex].quantity = productsInCart.products[getIndex].quantity + 1;
                    productsInCart.totalPrice = productsInCart.totalPrice + +product.price;
                }else{
                    let productToCart = {id: product.id, quantity:1 };
                    productsInCart.products.push(productToCart);
                    productsInCart.totalPrice = productsInCart.totalPrice + +product.price;
                }
                fs.writeFile(p,JSON.stringify(productsInCart),(err)=> {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Product added to cart");
                    }
                });
            }
        }); 
    }
   static deleteToCart(product){
        let productsInCart ;
        fs.readFile(p, (err,data)=> {
            if (err){
                return; //nothing to delete or to remove
            }else{
                productsInCart = JSON.parse(data);
                let getproduct = productsInCart.products.find((p)=> p.id === product.id);
              
                
                productsInCart.totalPrice = productsInCart.totalPrice - (getproduct.quantity * +product.price);
                productsInCart.products.filter((p)=> p.id !== product.id);
                let newProductInCart = {};
                newProductInCart.products = productsInCart.products.filter((p)=> p.id !== product.id);
                newProductInCart.totalPrice = productsInCart.totalPrice
              
                fs.writeFile(p, JSON.stringify(newProductInCart),(err)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Product is remove to the cart");
                    }
                });
            }
        });
    }
}

