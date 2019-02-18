
const Cart = require('./cart');
const database = require('../util/database');

        
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
    
    save(){
        if(this.id === null){
            //let query = `INSERT INTO products SET title='${this.title}', price='${this.price}', imageurl='${this.imageurl}', description='${this.description}'`;
           // let query = 'INSERT INTO products  SET title=?, price=?, imageurl=?, description=?', this.title, this.price, this.imageurl, this.description
           
            database.execute('INSERT INTO products  SET title=?, price=?, imageurl=?, description=?', [this.title, this.price, this.imageurl, this.description]).then(
                (data) => {
                    console.log('The data inserted');
                }
            ).catch((err)=>{
                console.log(err);
            });

        }else{
            let query = `UPDATE products SET title='${this.title}', price='${this.price}', imageurl='${this.imageurl}', description='${this.description}' WHERE id='${this.id}'`;
            database.execute(query).then(
                (data) => {
                    console.log('Data is updated');
                }
            ).catch((err)=>{
                console.log(err);
            });
        }
    }
   
    static fetchAll() {
       return database.execute('SELECT * FROM products');
    }
    static fetchSingle(id){
       return database.execute(`SELECT * FROM products WHERE id= ${id}`);
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
        
        });
       
       
    }
}