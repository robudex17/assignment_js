const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
const bookTitle = [];
// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  
 // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
 res.render(path.join(rootDir, 'views', 'add-product.pug'));
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  bookTitle.push(req.body);
  console.log(bookTitle);
  res.redirect('/');
});

module.exports = {router:router, title:bookTitle};
