class Human 
{
    constructor(firstName, lastName, gender, age, calories) 
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.calories = calories;

        this.showGuy();
        setInterval(() => {
            if(this.calories < 500) 
                {
                document.getElementById("msg").innerHTML = "I wanna eat!";
            }
        }, 1000);

        setInterval(() => {
            this.calories = this.calories - 200;
            this.showGuy();
        }, 60000);
    }
    
    sleepFor() 
    {
        let secs = prompt("How many secs to sleep?");

        document.getElementById("pic").src = "assets/images/sleeping.gif?t=" + Date.now();
        document.getElementById("msg").innerHTML = "I’m sleeping for " + secs + " seconds";

        setTimeout(() => {
            document.getElementById("pic").src = "assets/images/human.gif";
            document.getElementById("msg").innerHTML = "I’m awake now";
        }, secs * 1000);
    }
    
    feed() 
    {
        if(this.calories > 500) 
            {
            document.getElementById("msg").innerHTML = "I’m not hungry";
        } else 
        {
            document.getElementById("pic").src = "assets/images/eating.gif?t=" + Date.now();
            document.getElementById("msg").innerHTML = "Nom nom nom";

            setTimeout(() => {
                this.calories = this.calories + 200;
                document.getElementById("pic").src = "assets/images/human.gif";
                document.getElementById("msg").innerHTML = "";

                if(this.calories < 500) 
                    {
                    document.getElementById("msg").innerHTML = "I’m still hungry";
                }
                this.showGuy();
            }, 10000);
        }
    }
    
    dance() 
    {
        document.getElementById("pic").src = "assets/images/dancing.gif?t=" + Date.now();
        document.getElementById("msg").innerHTML = "I’m dancing!";

        setTimeout(() => {
            document.getElementById("pic").src = "assets/images/human.gif";
            document.getElementById("msg").innerHTML = "";
        }, 5000);
    }
    
    showGuy() 
    {
        let text = "First: " + this.firstName + "<br>";
        text = text + "Last: " + this.lastName + "<br>";
        text = text + "Gender: " + this.gender + "<br>";
        text = text + "Age: " + this.age + "<br>";
        text = text + "Calories: " + this.calories;

        document.getElementById("stats").innerHTML = text;
        
        let btns = '<button onclick="dude.sleepFor()">Sleep</button>';
        btns = btns + '<button onclick="dude.feed()">Feed</button>';
        btns = btns + '<button onclick="dude.dance()">Dance</button>';
        btns = btns + '<button onclick="goSuper()">Turn into Thor</button>';

        document.getElementById("buttons").innerHTML = btns;
    }
}

class Superhero extends Human 
{
    constructor(firstName, lastName, gender, age, calories) 
    {
        super(firstName, lastName, gender, age, calories);
        this.superName = "Thor " + lastName;
        this.showGuy();
    }
    
    feed() 
    {
        if(this.calories > 500) 
            {
            document.getElementById("msg").innerHTML = "I’m not hungry, mortal!";
        } else 
        {
            document.getElementById("pic").src = "assets/images/hero_eating.gif?t=" + Date.now();
            document.getElementById("msg").innerHTML = "Nom nom nom, Asgardian style!";

            setTimeout(() => {
                this.calories = this.calories + 200;
                document.getElementById("pic").src = "assets/images/hero.gif";
                document.getElementById("msg").innerHTML = "";

                if(this.calories < 500) 
                    {
                    document.getElementById("msg").innerHTML = "I’m still hungry, bring me mead!";
                }
                this.showGuy();
            }, 10000);
        }
    }
    
    fly() 
    {
        document.getElementById("pic").src = "assets/images/flying.gif?t=" + Date.now();
        document.getElementById("msg").innerHTML = "I’m flying!";

        setTimeout(() => {
            document.getElementById("pic").src = "assets/images/hero.gif";
            document.getElementById("msg").innerHTML = "";
        }, 10000);
    }
    
    fightWithEvil() 
    {
        document.getElementById("pic").src = "assets/images/defeating.gif?t=" + Date.now();
        document.getElementById("msg").innerHTML = "Khhhh-chh... Bang-g-g-g... Evil is defeated!";

        setTimeout(() => {
            document.getElementById("pic").src = "assets/images/hero.gif";
            document.getElementById("msg").innerHTML = "";
        }, 10000);
    }
    
    raiseHammer() 
    {
        document.getElementById("pic").src = "assets/images/hammer.gif?t=" + Date.now();
        document.getElementById("msg").innerHTML = "I wield Mjölnir!";

        setTimeout(() => {
            document.getElementById("pic").src = "assets/images/hero.gif";
            document.getElementById("msg").innerHTML = "";
        }, 5000);
    }
    
    showGuy() 
    {
        let text = "Super Name: " + this.superName + "<br>";
        text = text + "Real First: " + this.firstName + "<br>";
        text = text + "Real Last: " + this.lastName + "<br>";
        text = text + "Gender: " + this.gender + "<br>";
        text = text + "Age: " + this.age + "<br>";
        text = text + "Calories: " + this.calories;

        document.getElementById("stats").innerHTML = text;
        
        let btns = '<button onclick="dude.feed()">Feed</button>';
        btns = btns + '<button onclick="dude.fly()">Fly</button>';
        btns = btns + '<button onclick="dude.fightWithEvil()">Fight Evil</button>';
        btns = btns + '<button onclick="dude.raiseHammer()">Raise Hammer</button>';

        document.getElementById("buttons").innerHTML = btns;
    }
}

let dude = new Human("Thor", "Odinson", "Male", 1500, 800);

function goSuper() 
{
    if(dude.calories > 500) 
        {
        document.getElementById("pic").src = "assets/images/hero.gif";
        dude = new Superhero(dude.firstName, dude.lastName, dude.gender, dude.age, dude.calories);
    } else 
    {
        document.getElementById("msg").innerHTML = "Not enough calories for Asgardian power!";
    }
}