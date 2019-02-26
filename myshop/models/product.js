const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Product = sequelize.define('product', {
    id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey : true,
        autoIncrement: true,
        
    },
    title : {
        type: Sequelize.STRING(255),
        allowNull: false,

    },
    price : {
        type: Sequelize.FLOAT,
        allowNull: false

    },
    imageurl : {
        type : Sequelize.TEXT,
        allowNull: false
    },
    description : {
        type: Sequelize.TEXT,
        allowNull: false
    }
    
});

// const Product = sequelize.define('product', {
//     title: Sequelize.STRING
// });

module.exports = Product;