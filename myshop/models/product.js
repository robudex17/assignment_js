const fs = require('fs');
const path = require('path');


module.exports = class Product {

    constructor(title){
        this.title = title;
    }
    save() {
        let product = [];
        if(fs.existsSync(path.join(__dirname, '..', 'data', 'products.json'))){
            fs.readFile(path.join(__dirname, '..', 'data', 'products.json'),(err,data) =>{
                if (err){
                    console.log(err);
                }else{
                    product = JSON.parse(data);
                    product.push(this);
                    fs.writeFile(path.join(__dirname, '..', 'data', 'products.json'),JSON.stringify(product), (err) =>{
                        if (err){
                            console.log(err);
                        }else{
                            console.log('New product added')
                        }
                    });
                }
            });
        }else{
            product.push(this);
            fs.writeFile(path.join(__dirname, '..', 'data', 'products.json'),JSON.stringify(product), (err)=>{
                if(err) {
                    console.log(err);
                }else{
                    console.log('New product added');
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
}