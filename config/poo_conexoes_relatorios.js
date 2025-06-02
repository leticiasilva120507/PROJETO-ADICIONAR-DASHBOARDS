const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.HOST_RELATORIOS, 
    user: process.env.USER_RELATORIOS, 
    password: process.env.PASSWORD_RELATORIOS,
    database: process.env.DATABASE_RELATORIOS, 
    port: process.env.PORT_RELATORIOS,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, conn) => {
    if(err) 
        console.log(err)
    else
        console.log("Conectado ao SGBD!")
})

module.exports = pool.promise();
