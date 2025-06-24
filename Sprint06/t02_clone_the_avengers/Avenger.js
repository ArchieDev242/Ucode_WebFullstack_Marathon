class Avenger 
{
    constructor(name, alias, gender, age, powers, hp) 
    {
        this.name = name;
        this.alias = alias;
        this.gender = gender;
        this.age = age;
        this.powers = powers;
        this.hp = hp;
    }

    clone() 
    {
        return new Avenger(
            this.name,
            this.alias,
            this.gender,
            this.age,
            [...this.powers],
            this.hp
        );
    }
}

module.exports = { Avenger };