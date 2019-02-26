const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const CartItem = sequelize.define('cartItem', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey : true,
        allowNul : false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
})

module.exports = CartItem;