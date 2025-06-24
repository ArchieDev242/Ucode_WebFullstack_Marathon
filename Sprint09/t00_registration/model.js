const db = require('./db');

class Model 
{
  constructor(table_name) 
  {
    this.table = table_name;
  }

  static async create(data) 
  {
    const sql = `INSERT INTO ${this.table} SET ?`;
    const result = await db.query(sql, data);
    return result.insertId;
  }

  static async find_user(conditions) 
  {
    const sql = `SELECT * FROM ${this.table} WHERE ? LIMIT 1`;
    const rows = await db.query(sql, conditions);
    
    if(!rows || rows.length === 0) 
      {
      return null;
    }
    
    return rows[0] || null;
  }
}

module.exports = Model;