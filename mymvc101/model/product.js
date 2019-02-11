const fs = require('fs');
const path = require('path');

module.exports = class Product{
    constructor(t){
        this.title = t;
    }
    save() {
        let products = [];
        if (fs.existsSync(path.join(__dirname, '../', 'data', 'data.json'))){
            fs.readFile(path.join(__dirname, '..', 'data', 'data.json'), (err,data) => {
                if (err){
                    console.log(err);
                }else {
                    products = JSON.parse(data);
                    products.push(this);
                    fs.writeFile(path.join(__dirname,'..','data.json'),JSON.stringify(products), (err) =>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log('Data is saved');
                        }
                    });
                }
            });
        }else{
            products.push(this);
            fs.writeFile(path.join(__dirname, '..', 'data', 'data.json'),JSON.stringify(products),(err) =>{
                if(err){
                    console.log(err);
                }else{
                    console.log('Data is save');
                }
            });
        }
    }
    static fetchAll(cb) {
        fs.readFile(path.join(__dirname,'..', 'data','data.json'),(err,data)=>{
            if (err){
                cb([]);
            }else {
                
            }
        });
    }

}