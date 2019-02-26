
const sequelize = require('./util/database');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

//import routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const database = require('./util/database');

const User = require('./models/user');
const Product = require('./models/product');
const Address = require('./models/address');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item')

const app = express();

//set our view template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//set login users;
const loginUser = 2;

//use the body parser
app.use(bodyParser.urlencoded({extended: false}));

//serving static files (eg css and scripts)
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    User.findByPk(loginUser)
    .then(user => {
        req.user = user;
        console.log(`The User Currently login is ${req.user.user}`)
        next()
    })
    .catch(err => console.log(err))
})

app.use(adminRoutes);
app.use(shopRoutes);


 Product.belongsTo(User, {constraints: true , onDelete: 'CASCADE'});     //foreignkey is created in Product(source)
 User.hasMany(Product);      //foreignkey is created in Product(target)
 User.hasOne(Cart);         //foreignkey is created in Cart(target)
 Cart.belongsTo(User)
 Product.belongsToMany(Cart, {through: CartItem})  // got addition get/add/set/delete Product
 Cart.belongsToMany(Product, {through: CartItem})  // goo addition get/add/set/delet Cart


sequelize.sync()
.then(() => {
    console.log('All Tables are in sync');
    return User.findByPk(1)
}).then((user) => {
    if (!user) {
        User.create({
            user : "Admin",
            emailadd : "admin@test.com"  
         }
        )
       
    }else{
        
        console.log("Admin is already created")
    }
    app.listen(3001)
})
.catch(err => {
    console.log(err)
})

