class Timer 
{
    constructor(name, waitTime, howMany) 
    {
        this.name = name;
        this.waitTime = waitTime;
        this.howMany = howMany;
        this.left = howMany;
        this.timerThing = null;
    }
    
    start() 
    {
        console.log("Timer " + this.name + " started (delay=" + this.waitTime + ", stopCount=" + this.howMany + ")");
        this.timerThing = setInterval(() => {
            this.tick();
        }, this.waitTime);
    }
    
    tick() 
    {
        if(this.left > 0) 
            {
            this.left = this.left - 1;
            console.log("Timer " + this.name + " Tick! | cycles left " + this.left);

            if(this.left == 0) 
                {
                this.stop();
            }
        }
    }
    
    stop() 
    {
        clearInterval(this.timerThing);
        console.log("Timer " + this.name + " stopped");
    }
}

function runTimer(id, delay, counter) 
{
    let newTimer = new Timer(id, delay, counter);
    newTimer.start();
    return newTimer;
}