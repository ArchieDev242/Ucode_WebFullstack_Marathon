const Model = require('../model');

class User extends Model 
{
    static table = 'users';

    static async find_by_login(login) 
    {
        return super.find_user({ login });
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