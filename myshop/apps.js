const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//import routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const database = require('./util/database');

const app = express();

//set our view template engine
app.set('view engine', 'ejs');
app.set('views', 'views');



//use the body parser
app.use(bodyParser.urlencoded({extended: false}));

//serving static files (eg css and scripts)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.listen(3001);






