const { Avenger } = require('./Avenger');

class Team 
{
    constructor(id, avengers) 
    {
        this.id = id;
        this.avengers = avengers.map(avenger => avenger.clone());
    }

    clone() 
    {
        return new Team(this.id, this.avengers);
    }

    battle(damage) 
    {
        this.avengers.forEach(avenger => {
            avenger.hp -= damage.damage;
        });

        this.avengers = this.avengers.filter(avenger => avenger.hp > 0);
    }

    calculateLosses(clonedTeam) 
    {
        const losses = clonedTeam.avengers.length - this.avengers.length;

        if(losses === 0) 
            {
            console.log("We haven't lost anyone in this battle!");
        }else 
        {
            console.log(`In this battle we lost ${losses} Avengers.`);
        }
    }
}

module.exports = { Team };