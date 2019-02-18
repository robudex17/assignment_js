const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(__dirname, '..', 'data', 'products.json');
         
function writeToFile(prod){
    fs.writeFile(p,JSON.stringify(prod), (err)=>{
        if(err) {
            console.log(err);
        }else{
            console.log('New product added');
        }
    });
}
module.exports = class Product {

    constructor(id,title,price,imageurl,description){
        this.title = title;
        this.price = price;
        this.imageurl = imageurl;
        this.description = description;
        this.id = id;
    }
    
    save() {
        if(this.id === null) {
            this.id = Math.random().toString();
            let products = [];
            if(fs.existsSync(p)){
                fs.readFile(p,(err,data) =>{
                    if (err){
                        console.log(err);
                    }else{
                        products = JSON.parse(data);
                        products.push(this);
                        writeToFile(products);
                    }
                });
            }else{
                products.push(this);
                writeToFile(products);
                
            }                  
        }else {
            fs.readFile(p,(err,data) =>{
                if (err){
                    console.log(err);
                }else{
                    let products = JSON.parse(data);
                    let getproductIndex = products.findIndex((p) => p.id === this.id);
                    products[getproductIndex] = this;
                    writeToFile(products);
                }
            
            });      
        }
       
       
    }
    static fetchAll(cb) {
        fs.readFile(p,(err,data) =>{
            if (err){
                
                cb([]);
            }else{
                cb(JSON.parse(data));
            }
        });
    }
    static fetchSingle(id, cb){
        fs.readFile(p,(err,data)=>{
            if(err){
                console.log(err);
            }else {
                let products = JSON.parse(data);
                //short method
                let product = products.find((p) => p.id === id);
                    //long method
                    // let product = products.find((p) =>{
                    //     if(p.id === id){
                    //         return p;
                    //     }
                    // });
                cb(product);
            }
        });
    }
    static deleteProduct(id){

        fs.readFile(p,(err,data) =>{
            if (err){
                console.log(err);
            }else{
                let products = JSON.parse(data);
                let getproductIndex = products.findIndex((p) => p.id === id ); //you can use array.filter also
                Cart.deleteToCart(products[getproductIndex]);
                products.splice(getproductIndex,1);
                console.log(getproductIndex);
                writeToFile(products);                   
            }
        
        })
       
       
    }
}