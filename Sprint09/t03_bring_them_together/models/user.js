const Model = require('../model');

class User extends Model 
{
  static table = 'users';

  static async create(login, password, fullName, email) 
  {
    return super.create({
      login,
      password,
      full_name: fullName,
      email
    });
  }

  static async find_by_login(login) 
  {
    return this.find_user({ login });
  }

  static async find_by_email(email) 
  {
    try 
    {
      return await super.find_user({ email });
    } catch(error) 
    {
      console.error('Error finding user by email :<  :', error);
      throw error;
    }
  }

  static async authenticate(login, password) 
  {
    const user = await this.find_by_login(login);
    if(!user) return null;
    if(user.password !== password) return null; 
    return user;
  }
}

module.exports = User;