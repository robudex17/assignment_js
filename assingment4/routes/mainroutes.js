const express = require('express');
const router = express.Router();
const path = require('path');


//create middleware for the routes

const users = [];
router.get('/', (req, res, next) =>{
   // res.sendFile(path.join(__dirname, '../','views','index.html'));
   res.render(path.join(__dirname, '../', 'views', 'index'));
});

router.post('/users',(req,res,next)=>{
      
    users.push(req.body.user);
    let there_is = users.length !==0 ? true :false;
    console.log(there_is);
    res.render(path.join(__dirname, '../', 'views', 'users'), {users: users, there_is: there_is});
});

router.get ('/users', (req, res)=>{
    let there_is = users.length !==0 ? true :false;
    res.render(path.join(__dirname, '../', 'views', 'users'), {users: users,there_is: there_is});
});

module.exports = router;