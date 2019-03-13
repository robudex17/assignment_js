const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
const adminData = require('./admin');

router.get('/', (req, res, next) => {
  const productTitle = adminData.title;
  res.render(path.join(rootDir, 'views', 'shop.pug'),{price:10000,title:productTitle[0].title});
  console.log(productTitle[0]);
});

module.exports = router;
