const base_controller = require('./base_controller');

class error_controller extends base_controller 
{
    show404() 
    {
        return this.status(404).render_view('404.html');
    }
}

module.exports = error_controller;