const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schemaOrder = new Schema({
   items: [
       {
           productId:{
               type:Schema.Types.ObjectId,
               ref: 'Product',
               require:true
           },quantity: {
               type: Number,
               require: true
           }
        }
   ],
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   }
})


module.exports = mongoose.model('Oder', schemaOrder)