const mysql = require('mysql2/promise');
const config = require('./config.json');

const db_config = {
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
};

const pool = mysql.createPool(db_config);

module.exports = {
  query: async (sql, params) => {
    const [rows] = await pool.query(sql, params);
    return rows;
  }
};
