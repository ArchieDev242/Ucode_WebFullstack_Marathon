const base_controller = require('./base_controller');

class main_controller extends base_controller 
{
    show_main_page() 
    {
        if(!this.is_user_auth()) 
            {
            return this.redirect('/login');
        }
        
        return this.render_view('main.html');
    }
}

module.exports = main_controller;