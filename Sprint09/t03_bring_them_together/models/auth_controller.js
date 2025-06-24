const base_controller = require('./base_controller');
const User = require('./user');
const path = require('path');

class auth_controller extends base_controller 
{
    show_login() 
    {
        if(this.is_user_auth()) 
            {
            return this.redirect('/');
        }
        return this.render_view('login.html');
    }
    
    async login() 
    {
        const { login, password } = this.req.body;
        
        try 
        {
            const user = await User.authenticate(login, password);
            
            if(!user) 
                {
                return this.status(401).json({ 
                    error: 'Invalid credentials! ⚠️' 
                });
            }

            let user_status = user.status;

            if(login === 'admin') 
                {
                user_status = 'admin';
            }
            
            this.req.session.user = {
                id: user.id,
                login: user.login,
                full_name: user.full_name,
                email: user.email,
                status: user_status
            };

            return this.json({ 
                success: true,
                message: 'Access granted! 🔓',
                user: this.req.session.user 
            });

        } catch(error) {
            console.error('Login error :<  :', error);
            return this.status(500).json({ error: 'Internal server error! :<' });
        }
    }
    
    show_register() 
    {
        if(this.is_user_auth()) 
            {
            return this.redirect('/');
        }
        return this.render_view('registration.html');
    }
    
    async register() 
    {
        try 
        {
            const { login, password, full_name, email } = this.req.body;
            
            const is_user_exist = await User.find_by_login(login);

            if(is_user_exist) 
                {
                return this.status(400).json({ error: 'User already exists! :<' });
            }
            
            const is_email_exist = await User.find_by_email(email);

            if(is_email_exist) 
                {
                return this.status(400).json({ error: 'Email already registered! :<' });
            }
            
            await User.create(login, password, full_name, email);
            
            return this.status(201).json({ success: true, message: 'Registration successful! 🎉' });
        } catch(error) 
        {
            console.error('Registration error :<  :', error);
            return this.status(500).json({ error: 'Registration failed! :<' });
        }
    }
    
    logout() 
    {
        this.req.session.destroy(err => {
            if(err) 
                {
                return this.status(500).json({ error: 'Logout failed :<' });
            }

            this.res.clearCookie('connect.sid');
            return this.json({ success: true, message: 'Session terminated! :<' });
        });
    }
    
    check_auth() 
    {
        return this.json({
            authenticated: this.is_user_auth(),
            user: this.req.session.user || null
        });
    }
}

module.exports = auth_controller;