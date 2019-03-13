
const fs = require('fs');
const path = require('path');

module.exports = class Product {
    constructor(t){
        this.title = t;
    }
    save() {
        let products = [];
        if (fs.existsSync(path.join(__dirname,'..', 'data', 'data.json'))) {
            
                fs.readFile(path.join(__dirname, '..', 'data', 'data.json'),(err,data) =>{
                    if (err) {
                        console.log(err);
                    }else {
                        products = JSON.parse(data);
                        products.push(this);
                        fs.writeFile(path.join(__dirname, '..', 'data', 'data.json'),JSON.stringify(products), (err)=>{
                            if(err) throw err;
                            console.log('Book Save!');
                        });
                        
                    }
                });
        }else{
                products.push(this);
                fs.writeFile(path.join(__dirname, '..', 'data', 'data.json'),JSON.stringify(products), (err)=>{
                    if(err) throw err;
                    console.log('Book Save!');
                });
        }
       
    }
    static fetchall(cb) {
        let products = [];
        fs.readFile(path.join(__dirname, '..', 'data', 'data.json'), (err,data) => {
            if (err) {
                cb([]);
            }else {
                products = JSON.parse(data);
                cb(products);
            }
        });
    }
}


