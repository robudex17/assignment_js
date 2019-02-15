const path = require('path');
const fs =  require('fs');

const p = path.join(__dirname, '..', 'data',  'cart.json');

module.exports = class Cart {

    static addToCart(product) {
        const productToCart = {};
        let productsInCart = [];
        if(fs.existsSync(p)){
            console.log(p);
            fs.readFile(p ,(err,data) =>{
                productsInCart = JSON.parse(data);
               console.log(typeof(productsInCart));
               
                let getIndex = productsInCart.findIndex((p) => p.id === product.id);
            
                if (getIndex !== -1) { //if index of element is found
                    productsInCart[getIndex].id = product.id;
                    productsInCart[getIndex].title = product.title;
                    productsInCart[getIndex].total_price = +productsInCart[getIndex].total_price + +product.price;
                    productsInCart[getIndex].quantity = productsInCart[getIndex].quantity + 1;
                    
                }else {
                    productToCart.id = product.id;
                    productToCart.title = product.title;
                    productToCart.total_price = product.price;
                    productToCart.quantity = 1;
                    productsInCart.push(productToCart)
                }
              
                fs.writeFile(p,JSON.stringify(productsInCart),(err)=> {
                    if(err){
                        console.log(err);
                    }else {
                        console.log('Product Added Cart');
                    }
                });
            });
        }else {
            productToCart.id = product.id;
            productToCart.title = product.title;
            productToCart.total_price = product.price;
            productToCart.quantity = 1;
            productsInCart.push(productToCart);

            fs.writeFile(p, JSON.stringify(productsInCart),(err) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("New Prodcut Added to cart");
                }
            });
        } 
    }
}

