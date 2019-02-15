const fs = require('fs');
const path = require('path');


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
            if(fs.existsSync(path.join(__dirname, '..', 'data', 'products.json'))){
                fs.readFile(path.join(__dirname, '..', 'data', 'products.json'),(err,data) =>{
                    if (err){
                        console.log(err);
                    }else{
                        products = JSON.parse(data);
                        products.push(this);
                        fs.writeFile(path.join(__dirname, '..', 'data', 'products.json'),JSON.stringify(products), (err) =>{
                            if (err){
                                console.log(err);
                            }else{
                                console.log('New product added')
                            }
                        });
                    }
                });
            }else{
                products.push(this);
                fs.writeFile(path.join(__dirname, '..', 'data', 'products.json'),JSON.stringify(products), (err)=>{
                    if(err) {
                        console.log(err);
                    }else{
                        console.log('New product added');
                    }
                });
            }
            
        
        }else {
            fs.readFile(path.join(__dirname, '..', 'data', 'products.json'),(err,data) =>{
                if (err){
                    console.log(err);
                }else{
                    let products = JSON.parse(data);
                    let getproductIndex = products.findIndex((p) => p.id === this.id);
                    products[getproductIndex] = this;
                   
                    fs.writeFile(path.join(__dirname, '..', 'data', 'products.json'),JSON.stringify(products),(err)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log("Data Updated");
                        }
                    });
                      
                       
                }
            
            });      
        }
       
       
    }
    static fetchAll(cb) {
        fs.readFile(path.join(__dirname, '..', 'data', 'products.json'),(err,data) =>{
            if (err){
                
                cb([]);
            }else{
                cb(JSON.parse(data));
            }
        });
    }
    static fetchSingle(id, cb){
        fs.readFile(path.join(__dirname,'..', 'data','products.json'),(err,data)=>{
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

        fs.readFile(path.join(__dirname, '..', 'data', 'products.json'),(err,data) =>{
            if (err){
                console.log(err);
            }else{
                let products = JSON.parse(data);
                let getproductIndex = products.findIndex((p) => p.id === id );
                products.splice(getproductIndex,1);
                console.log(getproductIndex);
                fs.writeFile(path.join(__dirname, '..', 'data', 'products.json'),JSON.stringify(products),(err)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Data Updated");
                    }
                });
                  
                   
            }
        
        })
       
       
    }
}