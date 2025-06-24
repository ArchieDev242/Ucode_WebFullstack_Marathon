const mysql = require('mysql2/promise');
const config = require('./config.json');

const pool = mysql.createPool(config);

module.exports = {
  query: async (sql, params) => {
    const [rows] = await pool.query(sql, params);
    return rows;
  }
};