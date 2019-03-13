const db = require('mysql2')

const pool = db.createPool({
    host: '192.168.70.250',
    user : 'python',
    password: 'sbtph@2018',
    database: 'sbtphcsd'
})

module.exports = pool.promise()