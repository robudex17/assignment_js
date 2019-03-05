const mongodb = require('mongodb');
const getdb = require('../util/database').getdb

const Product = class {
    constructor (title,price,imageUrl,description){
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
       
    }
    save(){
        const db = getdb();
       return db.collection('products').insertOne(this)
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(err))
    }
    update(id) {
        const db = getdb();
        return db.collection('products').updateOne({_id : new mongodb.ObjectId(id)},{$set: this})
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(err))
    }
    static findAll() {
      const db = getdb();
      return db.collection('products').find().toArray()
      .then(products => {
          return products
      })
      .catch(err => console.log(err))
   
      
    }
    static findById(id) {
        const db = getdb();
       return  db.collection('products').find({_id : new mongodb.ObjectId(id)}).next()
        .then(product => {
            return product
        })
        .catch(err => console.log(err))
        
    }
   static deleteById(id) {
       const db = getdb();
       return db.collection('products').deleteOne({_id : mongodb.ObjectId(id)})
       .then(result => {
           console.log('Document was succefully deleted')
       })
       .catch(err => console.log(err))
   }

}


module.exports = Product;