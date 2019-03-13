const express = require('express')
const app = express()
const inboundRoutes = require('./routes/inbound_routes')
const path = require('path')
const database = require('./util/database')
const bodyParser = require('body-parser');


// set template engine

app.set('view engine', 'ejs')
app.set('views', 'views')

//use the body parser
app.use(bodyParser.urlencoded({extended: false}))

//serving static files (eg css and frontend javascript)
app.use(express.static(path.join(__dirname, 'public')))
app.use(inboundRoutes)


app.listen(4000)

