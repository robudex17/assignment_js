const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const User = sequelize.define('user',{
    id: {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emailadd : {
        type : Sequelize.STRING,
        allowNull: false
    }
}); 

// const User = sequelize.define('user',{
//     first_name : Sequelize.STRING,
//     last_name : Sequelize.STRING
// })
module.exports = User;