
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const mongoose = require('mongoose');

//import routes
 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');

//const dbConnect = require('./util/database').dbConnect;
const User = require('./models/user')
const Person = require('./models/populate').personSchema
const Story = require('./models/populate').storySchema

const app = express();

let loginUser;

//set our view template engine
app.set('view engine', 'ejs');
app.set('views', 'views');



//use the body parser
app.use(bodyParser.urlencoded({extended: false}));

//serving static files (eg css and scripts)
app.use(express.static(path.join(__dirname, 'public')));

//set login user
app.use((req, res,next) =>{
   return User.findById('5c869529baa8304614a954ac').then(user =>{
        req.user = user
       // console.log(user)
        next()
    })
})

app.use('/admin',adminRoutes);
app.use(shopRoutes);


//mongoose testing
mongoose.connect('mongodb+srv://robudex17:Uwuv5s6KBcXR0SNw@cluster0-eexlp.mongodb.net/shop?retryWrites=true',{useNewUrlParser:true})
.then(() => {
     console.log('We are now connected')
    User.findById('5c869529baa8304614a954ac').then(user => {
        if(user){
            
            return user;
        //   const author = new Person({name: 'Rogmer', age: 34})
        //   author.save().then(author => {
        //       const story = new Story({title: 'Casino Royal', author:author._id})
        //       return story.save()
        //   }).then(story => {
        //       console.log('New document is saved')
        //   }).catch(err => console.log(err))

        User.deleteOne({'user.cart.items[0]._id': new mongodb.ObjectId('5c86c2721e453d4a507397aa')}).then(result => console.log(result))   
        }else{
            const insertuser = {name:'Rogmer', username:'admin', email: 'admin@test.com', cart: {items:[]}}
            const user = new User(insertuser)
            return user.save()
        }
    })
    
})
.then(user => {
    app.listen(3000)
})
.catch(error => console.log(error))