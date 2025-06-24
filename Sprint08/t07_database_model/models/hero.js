const Model = require('../model');
const pool = require('../db');

class Hero extends Model 
{
  static get tableName() 
  {
    return 'heroes';
  }

  constructor(attributes = {}) 
  {
    super(attributes);
    this.id = attributes.id;
    this.name = attributes.name;
    this.race_id = attributes.race_id;
  }
}

module.exports = Hero;