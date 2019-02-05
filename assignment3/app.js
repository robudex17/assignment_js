const express = require('express');
const routes = require('./routes/routes');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.listen(3000);
