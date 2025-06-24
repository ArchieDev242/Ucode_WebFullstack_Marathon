const mysql = require('mysql2/promise');
const config = require('./config.json');

const pool = mysql.createPool({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database,
  waitForConnections: config.waitForConnections,
  connectionLimit: config.connectionLimit,
  queueLimit: config.queueLimit
});

pool.getConnection((err, connection) => {
    if(err) 
        {
      console.error('Error connecting to the database:', err.message);
      return;
    }
    
    console.log('Successfully connected to the database');
    connection.release();
  });

module.exports = pool;