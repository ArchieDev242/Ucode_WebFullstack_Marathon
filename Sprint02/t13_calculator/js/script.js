function Calculator() 
{
    this.result = 0;
    
    this.init = function(n) 
    {
        this.result = Number(n);
        return this;
    };
    
    this.add = function(x) 
    {
        this.result = this.result + x;
        return this;
    };
    
    this.sub = function(x) 
    {
        this.result = this.result - x;
        return this;
    };
    
    this.mul = function(x) 
    {
        this.result = this.result * x;
        return this;
    };
    
    this.div = function(x) 
    {
        if(x != 0) this.result = this.result / x;
        else console.error("Division by zero!");
        return this;
    };
    
    this.alert = function() 
    {
        var that = this;

        window.setTimeout(function timer() 
        {
            window.alert(that.result);
        }, 5*1000);
    };
}