const Model = require('../model');

class User extends Model 
{
  static table = 'users';

  static async create(login, password, full_name, email) 
  {
    return super.create({
      login,
      password,
      full_name: full_name,
      email
    });
  }

  static async find_by_login(login) 
  {
    return this.find_user({ login });
  }

  static async find_by_email(email) 
  {
    return this.find_user({ email });
  }
}

module.exports = User;