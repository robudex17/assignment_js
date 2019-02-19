
const Sequelize = require('sequelize');

const dbname = 'shop';
const dbuser = 'python';
const dbpass = 'sbtph@2018';
const dbhost = '192.168.70.250';

const sequelize = new Sequelize(dbname, dbuser,dbpass, {
    host: dbhost,
    dialect: 'mysql',
    operatorsAliases: false,
    pool : {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}); 



module.exports = sequelize;



