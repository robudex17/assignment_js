
const path = require('path');
const users = [];
const fs = require('fs');

exports.addUsername = (req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'views', 'add-username.html'));
    
};

exports.listUsername = (req,res, next) =>{
    users.push(JSON.stringify(req.body));
    console.log(users);
    fs.appendFile(path.join(__dirname, '..', 'controllers/data', 'users.json' ), users, (err,data) =>{
       if (err) {
           console.log(err);
       } else{
           console.log(data);
       }
    });
    res.redirect('/admin/add-username');
};