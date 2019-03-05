const getdb = require('../util/database').getdb;
const mongodb = require('mongodb')
const Product = require('../models/product')

const User = class {
    constructor(username,email,cart={items:[]},id){
        this.username = username;
        this.email = email;
        this.cart = cart;
        this.id = id;
    }
    save() {
        const db = getdb();
       // const user = db.collection('users');
        return db.collection('users').insertOne(this)
        .then(user => {
            console.log(user)
            return user
        })
        .catch(err => console.log)
    }
    static findById(userId, callback){
        const db = getdb()
        const user = db.collection('users')
       return db.collection('users').find({_id: new mongodb.ObjectId(userId)}).next()
        .then(user => {
             return user
        }).catch(err => {
            console.log(err)
        })
    }
    postCart(productId) {
        const db = getdb()
        let quantity = 1
        let cart = {...this.cart}
        console.log(cart)
        let itemIndex = cart.items.findIndex(item => item.product_id === productId)
        if(itemIndex === -1) { //when index is not found
            let cartItem = {product_id:productId,quantity:quantity}
            cart.items.push(cartItem)
        }else {
            let newQuantiy = cart.items[itemIndex].quantity +1
            let product_id = cart.items[itemIndex].product_id
            cart.items[itemIndex].product_id =product_id
            cart.items[itemIndex].quantity = newQuantiy
        }
        return db.collection('users').updateOne({_id : new mongodb.ObjectId(this.id)},{$set: {cart: cart} } )
        .then(result => result)
        .catch(err => console.log(err))

    }

     getCart(){
        const db = getdb();
        return db.collection('users').find({_id: new mongodb.ObjectId(this.id)}).next()
        .then(user => {
            let items = user.cart.items 
        
            let getProductId = user.cart.items.map(product => new mongodb.ObjectId(product.product_id))

           return db.collection('products').find({_id: {$in : getProductId}}).toArray().then(products => {
              let merge =  products.map(p => {
                    return {...p, quantity: items.find(i => {
                       return i.product_id.toString() === p._id.toString()
                           
                    }).quantity}
                })
                 return merge   
            })
            
           
        })
        .catch(err => console.log(err))
    }
    deleteFromCart(productId){
        const db = getdb();
       return db.collection('users').find({_id: new mongodb.ObjectId(this.id)}).next()
        .then(user => {
            let item = user.cart.items.find(item => item.product_id === productId ) 
            console.log(item)
            
           let cart = {...user.cart}
           let product = cart.items.find(item => item.product_id.toString() === productId.toString())
           let updateCart = {} 
           updateCart.items = cart.items.filter(p => p !== product )
            return updateCart
           
        }).then(cart => {
            return db.collection('users').updateOne({_id : new mongodb.ObjectId(this.id)}, {$set: {cart:cart}})
        })
    }
    createOrder(){
        const db = getdb();
        return this.getCart().then(product => {
            const order = {
                items: product,
                user : {
                    _id :  new mongodb.ObjectId(this.id),
                    username : this.username,
                    email : this.email
                }
            };
            return db.collection('orders').insertOne(order)
            .then(result => {
                const cart = {items: []}
                return db.collection('users').updateOne({_id : new mongodb.ObjectId(this.id)},{$set: {cart: cart}})
            })

            
        }) 
        
     }
     getOrders() {
         const db = getdb();
         return db.collection('orders').find({'user._id' : new mongodb.ObjectId(this.id)}).toArray()
         .then(orders => {
            console.log(orders)
            return orders
           
            })

     }

}

module.exports = User;