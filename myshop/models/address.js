const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Address = sequelize.define('address', {
    type: Sequelize.STRING,
    line_1: Sequelize.STRING,
    line_2 : Sequelize.STRING,
    city : Sequelize.STRING,
    state : Sequelize.STRING,
    zip : Sequelize.STRING
})

module.exports = Address;