
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');


//import routes
 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');

const dbConnect = require('./util/database').dbConnect;

const app = express();

//set our view template engine
app.set('view engine', 'ejs');
app.set('views', 'views');



//use the body parser
app.use(bodyParser.urlencoded({extended: false}));

//serving static files (eg css and scripts)
app.use(express.static(path.join(__dirname, 'public')));


 app.use('/admin',adminRoutes);
 app.use(shopRoutes);


dbConnect( message => {
    app.listen(3000)
    console.log(message)
})


