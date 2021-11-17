const mysql = require('mysql');
//var session = require('express-session');
//var MySQLStore = require('express-mysql-session')(session);

const info = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : '2wndeo12#',
    database : 'opentutorials',
    
})

//var sessionStore = new MySQLStore()

module.exports = {
    _mysql : info,
}