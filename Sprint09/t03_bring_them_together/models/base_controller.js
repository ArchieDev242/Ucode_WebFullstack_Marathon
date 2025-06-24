class base_controller 
{
    constructor(req, res) 
    {
        this.req = req;
        this.res = res;
        this.viewPath = '/home/archie242/Desktop/Projects_IT/CumPus/WebFullstack/Sprint09/mkopychko-5308/t03_bring_them_together/views';
    }
    
    render_view(view) 
    {
        return this.res.sendFile(`${this.viewPath}/${view}`);
    }
    
    json(data) 
    {
        return this.res.json(data);
    }
    
    status(code) 
    {
        this.res.status(code);
        return this;
    }
    
    is_user_auth() 
    {
        return !!this.req.session.user;
    }
    
    redirect(url) 
    {
        return this.res.redirect(url);
    }
}

module.exports = base_controller;