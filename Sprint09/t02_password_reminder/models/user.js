const Model = require('../model');

class User extends Model 
{
  static table = 'users';

  static async find_by_email(email) 
  {
    try 
    {
      const user = await super.find_user({ email });
      return user;
    } catch(error) 
    {
      throw error;
    }
  }
}

module.exports = User;