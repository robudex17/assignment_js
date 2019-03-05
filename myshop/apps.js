
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');


//import routes
 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');

const dbConnect = require('./util/database').dbConnect;
const User = require('./models/user')

const app = express();

let loginUser;

//set our view template engine
app.set('view engine', 'ejs');
app.set('views', 'views');



//use the body parser
app.use(bodyParser.urlencoded({extended: false}));

//serving static files (eg css and scripts)
app.use(express.static(path.join(__dirname, 'public')));

 //getting loginuser
 app.use((req,res,next) =>{
     User.findById('5c79b6b55e5a9741f0e4d592').then(user => {
        // req.user = user
         req.user = new User(user.username, user.email, user.cart ,user._id)
        
         next()
     })
 })
 app.use('/admin',adminRoutes);
 app.use(shopRoutes);


dbConnect( message => {
    User.findById('5c79b6b55e5a9741f0e4d592').then(user => {
        if(user.username === 'admin') {
            return user
        }else{
            const user = new User('admin', 'admin@nodejs.com')
            user.save()
            return user
        }
    
    }).then(user => {
        app.listen(3000)
    })
    .catch(err => {
        console.log('Cannot Connect')
        console.log(err)
    })
    
})
     


// var orders = [];
// let order = {};

// order.items = [];
// var product1 = {
//   id: 2312312312,
//   title: 'First Book',
//   price : 1000,
//   urlImage : 'test1.com',
//   description : 'description 1',
//   quantity: 2
// }
// var product2 = {
//   id: 123123123123,
//   title: 'SecondBook',
//   price : 1000,
//   urlImage : 'test2.com',
//   description : 'description 2',
//   quantity: 2
// }
// order.user1 = {
//       _id: 123123123123123,
//        username : "user1",
//        email : "user1@test.com"
//        }


// order.items.push(product1);
// order.items.push(product2);

// orders.push(order);



// orders.forEach(order => {
//     order.items.forEach(product => {
//         console.log(`product Title: ${product.title}`)
//         console.log(`Price ${product.price}`)
//     })
// })