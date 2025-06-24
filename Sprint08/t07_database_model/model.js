const pool = require('./db');

class Model 
{
  constructor(attributes = {}) 
  {
    this.attributes = attributes;
  }

  static get tableName() 
  {
    return this.name.toLowerCase() + 's';
  }

  static async find(id) 
  {
    try 
    {
      const [rows] = await pool.query(
        `SELECT * FROM ${this.tableName} WHERE id = ?`,
        [id]
      );

      if(rows.length === 0) return null;
      return new this(rows[0]);
    } catch(err) 
    {
      throw new Error(`Record search failed: ${err.message}`);
    }
  }

  async delete() 
  {
    if(!this.attributes.id) throw new Error('No ID to remove');
    
    try 
    {
      await pool.query(
        `DELETE FROM ${this.constructor.tableName} WHERE id = ?`,
        [this.attributes.id]
      );

      return true;
    } catch(err) 
    {
      throw new Error(`Deleting error: ${err.message}`);
    }
  }

  async save() 
  {
    try 
    {
      if(this.attributes.id) 
        {
        const fields = Object.keys(this.attributes)
          .filter(key => key !== 'id')
          .map(key => `${key} = ?`)
          .join(', ');

        const values = Object.values(this.attributes)
          .filter((_, index) => Object.keys(this.attributes)[index] !== 'id');

        await pool.query(
          `UPDATE ${this.constructor.tableName} 
          SET ${fields} 
          WHERE id = ?`,
          [...values, this.attributes.id]
        );
      } else 
      {
        const fields = Object.keys(this.attributes).join(', ');
        const placeholders = Object.keys(this.attributes).fill('?').join(', ');
        
        const [result] = await pool.query(
          `INSERT INTO ${this.constructor.tableName} (${fields}) 
          VALUES (${placeholders})`,
          Object.values(this.attributes)
        );

        this.attributes.id = result.insertId;
      }

      return this;
    } catch(err) 
    {
      throw new Error(`Saving error: ${err.message}`);
    }
  }
}

module.exports = Model;