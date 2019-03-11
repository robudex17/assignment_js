const mongoose = require('mongoose')
const Order = require('./order')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart:{
        items: [  
            {
                productId:{
                    type: Schema.Types.ObjectId,ref:'Product',require:true},
                    quantity:{
                        type:Number,require:true}
            }]
     }
})


userSchema.methods.getUsername = function(cb) {
    cb({name: 'Rogmer', age:34})
}
// method 1: WITH CALLBACK FUNCTION
// userSchema.methods.getCart = function(cb) {
//     return this.model('User').find({_id: mongoose.Types.ObjectId(this._id)}).then(cart => {
//         cb(cart)
//     }).catch(err => console.log(err))
// }

userSchema.methods.postCart = function(productId) {
    const quantity = 1;
    let cart = this.cart  

    let itemsIndex = cart.items.findIndex(item => item.productId.toString() === productId.toString())
    if(itemsIndex === -1){
        let product = {productId: productId,quantity: quantity}     
        cart.items.push(product)
       
    }else {  
        cart.items[itemsIndex].quantity = cart.items[itemsIndex].quantity +1      
    }
   
    return this.model('User').updateOne({_id: mongoose.Types.ObjectId(this._id)},{cart: cart})
       
  
}
userSchema.methods.getCart = function() {
    return this.model('User').find({_id: mongoose.Types.ObjectId(this._id)}).populate('cart.items.productId')
}

userSchema.methods.createOrder = function() {
  return this.model('User').findOne({_id: mongoose.Types.ObjectId(this._id)}).then(yourOrder => {

        const orderItems = {
            items: yourOrder.cart.items,
            userId : yourOrder._id
        }    
        const order = new Order(orderItems)
        return order.save()
    })
    .then(order => {
        cart = {item:[]}
        return this.model('User').updateOne({_id:  mongoose.Types.ObjectId(this._id)},{cart: cart})
    }).then(() => {
        console.log('New Order has made')
    })
    .catch(err => console.log(err))
    
}

userSchema.methods.getOrders = function() {
    return Order.find({userId: this._id}).populate('items.productId userId').then(orders =>{
       // console.log(orders[0].userId.name)
         return orders
        })
}
module.exports = mongoose.model('User', userSchema);

