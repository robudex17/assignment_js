const express = require('express');
const routes = require('./routes/mainroutes');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'pug'); //set template engine
app.set('views', './views');
app.use(bodyParser.urlencoded({extended:false}));
app.use(routes);

app.listen(3000);