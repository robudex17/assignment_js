//import express module
const express = require('express');
const  bodyParser = requre('body-parser');

//create app object by calling the express as a function..
const app = express();
//task 1
    // //create middleware1
    // app.use((req, res, next)=>{
    //     console.log('This is the first middleware');
    //     next();
    // });

    // //create middleware2
    // app.use((req,res,next)=>{
    //     console.log('This is the second middleware');
    // });
 
//task2
app.use('/users',(req, res,next)=>{
    const url = req.method;
    res.send(`<html><body><h1>This is the list of users pages ${url}</h1></body></html>`);
});

app.use('/', (req,res, next)=>{
    res.send('<html><body><h1>This the Home page</h1></body></html>');
});

//create server and listen to port 3000
app.listen(3000);